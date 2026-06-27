# Module 开发

Module 用于自动消费 Redis Stream 中的原始告警，并把它们转换为 ASP 工作台中的 Case / Alert / Artifact。

## 脚本位置

用户自定义 Module 放在：

```text
custom/modules/
```

示例 raw alert 位于：

```text
backend/examples/modules/
```

Module 文件由后端自动发现。每个文件需要定义一个 `Module` 类，继承 `BaseModule`，并设置 `STREAM_NAME`。

## 基本结构

```python
from apps.agentic.runtime.base import BaseModule


class Module(BaseModule):
    NAME = "Human readable name"
    DESC = "Short description"
    STREAM_NAME = "SIEM-Rule-Or-Stream-Name"
    THREAD_NUM = 1

    def run(self, message):
        # message 是从 Redis Stream 读取到的 raw alert dict
        ...
```

## 运行方式

Module worker 会扫描 `custom\modules\*.py`，发现其中继承 `BaseModule` 的 `Module` 类，然后按 `STREAM_NAME` 消费 Redis Stream。

```bash
python manage.py run_agentic_module_worker
```

默认 consumer group 为 `agentic-modules`。Webhook 和 ELK Index Action 写入的 Stream 名称需要与 Module 的 `STREAM_NAME` 对应。

修改 Module 后，可以在 `System Settings` → `Runtime` 中点击 `Refresh / Validate` 查看加载结果。若 Module 引入了新的第三方包，需要先更新 `custom\requirements.txt` 并重新安装依赖。

## 处理流程

1. 读取 raw alert。
2. 解析事件时间，建议使用 `parse_event_time()`。
3. 提取关键字段和 Artifact，例如 IP、域名、账号、主机、文件、进程。
4. 设计 `correlation_uid`，建议使用 `generate_correlation_uid()`。
5. 使用 `create_alert_with_context()` 创建或关联 Case、Alert、Artifact 和 Enrichment。
6. 必要时触发 Case AI 分析。

## 当前示例

示例脚本和 raw alert 样本位于 `backend\examples\modules\`，仅用于参考和本地开发，不会被生产运行时自动加载。

- `aws_iam_privilege_escalation_attach_user_policy.py`
  - 处理 AWS CloudTrail `AttachUserPolicy` 高危 IAM 行为。
  - 示例重点：云账号、主体身份、目标用户、权限策略和来源 IP。
- `edr_vssadmin_delete_shadows.py`
  - 处理 EDR 中 `vssadmin delete shadows` 类勒索前置行为。
  - 示例重点：主机、用户、进程、命令行和文件哈希。
- `mail_user_report_phishing.py`
  - 处理用户上报钓鱼邮件。
  - 示例重点：发件人、收件人、上报人、主题、URL、域名和附件。

## 推荐数据落点

Module 应尽量输出或关联：

- Case：同一事件的处置入口。
- Alert：检测上下文和原始日志。
- Artifact：IOC、账号、主机、文件、进程等实体。
- Enrichment：可复用的外部上下文。

## 设计建议

- `STREAM_NAME` 与 SIEM Rule / Redis Stream 名称保持一致。
- 不要把随机字段作为聚合键，例如 request id、session id、精确时间戳。
- 一个 Case 应代表一次可调查、可处置的安全事件，而不是单条日志。
- Artifact 尽量拆成可调查的原子实体。
- raw alert 原文应保存在 Alert 的 `raw_data` 中，未映射但有价值的字段放入 `unmapped`。
- 可以使用 [Module Creator](../../integrations/claude-code/skills/module-creator/) Skill 辅助生成 Module 草案。
