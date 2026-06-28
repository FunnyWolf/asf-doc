# Playbook 开发

Playbook 是 ASP 中面向 Case 的自动化任务。

## 脚本位置

Compose 部署时，用户自定义 Playbook 放在：

```text
custom/playbooks/
```

源码开发时，内置示例位于：

```text
backend/playbooks/
```

每个文件需要定义一个 `Playbook` 类，继承 `BasePlaybook`，并设置 `NAME`、`DESC` 和 `TAGS`。

## 基本结构

```python
from apps.agentic.runtime.base import BasePlaybook


class Playbook(BasePlaybook):
    NAME = "Playbook Name"
    DESC = "What this playbook does."
    TAGS = ["System"]

    def run(self):
        if self.case is None:
            raise ValueError("Playbook requires a linked case.")

        # self.case 是触发来源 Case
        # self.user_input 是用户运行时填写的补充说明
        return "Execution summary"
```

## 运行方式

用户从 Case 详情页选择 Playbook 并提交后，后端会创建一条 `Pending` 的 Playbook 记录。后台 worker 会领取任务并执行脚本：

```bash
python manage.py run_agentic_playbook_worker
```

执行成功后，返回值会写入 Playbook 的 `Remark`；执行失败时，异常信息会写入失败记录。

修改 Playbook 后，可以在 `Custom` → `Playbooks` 中点击 `Refresh / Validate` 查看加载结果。若 Playbook 引入了新的第三方包，需要先更新 `custom\requirements.txt` 并重新安装依赖。

## 当前示例

- `investigation.py`
  - 触发 Case AI 调查，并把报告写回 Case。
- `knowledge_extraction.py`
  - 从已有 analyst verdict 的 Case 中提取可复用知识。
- `threat_intelligence_enrichment.py`
  - 对 Case 关联 Artifact 查询威胁情报，并写入 Artifact Enrichment。
- `custom\playbooks\cmdb_enrichment.py`
  - 对 Case 关联 Artifact 查询 CMDB，并写入 Artifact Enrichment。
- `custom\playbooks\case_summary.py`
  - 读取 `custom\data\playbooks\case_summary\System_<lang>.md`，调用 LLM 生成 Case Summary。

## 数据落点

Playbook 不应只输出临时文本。推荐把结果写回：

- Case：调查报告、AI 评估、摘要。
- Knowledge：从案件提取的可复用知识。
- Enrichment：威胁情报、资产、身份或历史上下文。
- Playbook：任务状态、备注和后台任务 ID。

## 自定义 Prompt

自定义 Playbook 可以把提示词放在：

```text
custom/data/playbooks/<playbook_slug>/System_en.md
custom/data/playbooks/<playbook_slug>/System_zh.md
```

Playbook 中通过 `self.read_prompt("System")` 按 Runtime 的 Prompt Language 读取对应文件。缺少 Prompt 文件时，Playbook 会失败并把错误写入任务记录。

## 设计建议

- 输入围绕 Case。
- 输出结构化。
- 失败原因写入任务记录。
- 外部查询结果写入 Enrichment，便于后续审计和复用。
- 需要生成报告或结构化判断时，优先写回 Case 或 Knowledge。
- 可以使用 [Playbook Creator](../../integrations/claude-code/skills/playbook-creator/) Skill 辅助生成 Playbook 草案。
