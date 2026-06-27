# 定制开发

定制开发用于说明如何根据自己的安全运营场景扩展 ASP。

当前开放给用户自定义开发的主要扩展点是 Module、Playbook 和 SIEM YAML。

## 适用读者

- 需要把新的 SIEM Rule 告警接入 ASP 的开发者。
- 需要为 Case 编排自动化调查、富化或处置动作的开发者。
- 需要为 Agent / MCP 查询补充 SIEM 索引字段说明的开发者。

## 扩展点

| 扩展点 | 位置 | 用途 |
| --- | --- | --- |
| Module | `custom\modules\*.py` | 消费 Redis Stream 中的原始告警，生成 Case / Alert / Artifact。 |
| Playbook | `custom\playbooks\*.py` / `backend\playbooks\*.py` | 从 Case 触发用户主动执行的自动化任务。 |
| SIEM YAML | `custom\data\siem\*.yaml` | 描述 Splunk / ELK 索引、字段和默认聚合字段，供 Agent / MCP 查询使用。 |

生产运行时默认只从 `custom/` 加载 Module 和 SIEM YAML。源码仓库中的 `backend\custom\` 可作为本地开发样例；发布包中的 `custom/` 默认是空模板。Playbook 保留产品内置能力，也允许通过 `custom\playbooks\*.py` 追加或覆盖。

## 数据流

```text
SIEM Rule
  → Webhook / ELK Index Action
  → Redis Stream
  → Module
  → Case / Alert / Artifact
  → Playbook / Enrichment / Knowledge
```

Module 负责把原始告警降噪和标准化，让分析师围绕 Case 工作；Playbook 负责在 Case 上推进调查、富化、知识提取或其他自动化动作；SIEM YAML 让 Agent 能理解和查询外部日志。

## 刷新与依赖

修改 Module、Playbook 或 SIEM YAML 后，可以在 `System Settings` → `Runtime` 中点击 `Refresh / Validate` 重新扫描并查看加载结果。加载失败会显示文件路径和异常信息，并写入 Audit Log。

如果新增或升级了 Python 依赖，先更新 `custom\requirements.txt`，再执行：

```bash
docker compose run --rm asp-custom-deps --index-url https://pypi.org/simple
```

依赖包或公共 helper module 变更后，需要重启相关容器；单纯脚本定义或 YAML 变更可通过刷新/校验确认。

## 当前示例

当前后端在 `backend\custom\modules\` 中包含以下 Module 示例：

- `aws_iam_privilege_escalation_attach_user_policy.py`
- `edr_vssadmin_delete_shadows.py`
- `mail_user_report_phishing.py`

当前后端包含以下 Playbook 示例：

- `investigation.py`
- `knowledge_extraction.py`
- `threat_intelligence_enrichment.py`
- `cmdb_enrichment.py`

## 推荐阅读顺序

1. [开发环境搭建](environment-setup/)：准备源码开发环境和 custom 目录。
2. [Module 开发](module-examples/)：了解如何把 Stream 告警转换为 ASP 资源。
3. [Playbook 开发](playbook/)：了解如何编写 Case 触发的自动化任务。
4. [SIEM YAML](siem-yaml/)：了解如何为 Agent / MCP 查询维护索引配置。

ClaudeCode 插件中的 [Module Creator](../integrations/claude-code/skills/module-creator/) 和 [Playbook Creator](../integrations/claude-code/skills/playbook-creator/) 可以辅助生成代码草案。
