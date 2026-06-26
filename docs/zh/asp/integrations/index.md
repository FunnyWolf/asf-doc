# 集成

ASP 当前文档保留以下集成入口：

| 集成 | 说明 |
| --- | --- |
| [Webhook](webhook/) | 接收 Splunk / Kibana 告警，让外部检测系统把告警送入 ASP。 |
| [ELK Index Action](elk-index-action/) | 从 Kibana action 写入的 Elasticsearch 索引中轮询告警。 |
| [ClaudeCode 插件](claude-code/) | 让 ClaudeCode 中的 Agent 和 Skill 使用 ASP 的 Case、Alert、Artifact、SIEM、Playbook 等能力。 |

SIEM、LLM、LDAP、威胁情报等运行配置放在系统设置中，不作为集成章节的独立主线。
