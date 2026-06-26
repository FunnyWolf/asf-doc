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
| Module | `backend\modules\*.py` | 消费 Redis Stream 中的原始告警，生成 Case / Alert / Artifact。 |
| Playbook | `backend\playbooks\*.py` | 从 Case 触发用户主动执行的自动化任务。 |
| SIEM YAML | `backend\data\siem\*.yaml` | 描述 Splunk / ELK 索引、字段和默认聚合字段，供 Agent / MCP 查询使用。 |

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

## 当前示例

当前后端包含以下 Module 示例：

- `aws_iam_privilege_escalation_attach_user_policy.py`
- `edr_vssadmin_delete_shadows.py`
- `mail_user_report_phishing.py`

当前后端包含以下 Playbook 示例：

- `investigation.py`
- `knowledge_extraction.py`
- `threat_intelligence_enrichment.py`
- `cmdb_enrichment.py`

## 推荐阅读顺序

1. [Module 开发](module-examples/)：了解如何把 Stream 告警转换为 ASP 资源。
2. [Playbook 开发](playbook/)：了解如何编写 Case 触发的自动化任务。
3. [SIEM YAML](siem-yaml/)：了解如何为 Agent / MCP 查询维护索引配置。

ClaudeCode 插件中的 [Module Creator](../integrations/claude-code/skills/module-creator/) 和 [Playbook Creator](../integrations/claude-code/skills/playbook-creator/) 可以辅助生成代码草案。
