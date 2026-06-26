# 基础配置

首次部署后建议按以下顺序完成配置。

## 1. LLM Provider

在系统设置中添加至少一个启用的 LLM Provider。常用字段包括：

- Name
- Base URL
- Model
- API Key
- Proxy
- Tags
- Priority
- Enabled

Tags 可用于区分 `fast`、`powerful`、`tool_calling`、`structured_output` 等模型能力。

建议至少配置一个带 `structured_output` 标签的 Provider，否则 AI 调查和知识提取可能无法运行。

## 2. SIEM

配置 Splunk 或 ELK，用于后续日志搜索、Agent 调查和 ELK Index Action。

如果需要 Agent / MCP 查询 SIEM，还需要维护 `backend\data\siem\*.yaml` 索引配置。

## 3. 威胁情报

启用 AlienVault OTX 后，Threat Intelligence Enrichment Playbook 可以把 IOC 查询结果写入 Artifact 的 Enrichment。

## 4. LDAP

如果需要企业身份源，配置 LDAP 并通过测试功能确认连接可用。

## 5. Runtime

根据团队语言和运行规模配置 Runtime：

- Prompt Language：默认 `en`，中文团队可以设置为 `zh`。
- Stream Maxlen：默认 `10000`，控制 Webhook 告警写入 Redis Stream 时保留的近似最大长度。

## 6. Webhook / ELK Index Action

选择告警接入方式：

- SIEM 可以直接访问 ASP：使用 Webhook。
- Kibana 只能写入 Elasticsearch 索引：使用 ELK Index Action，并启动 `run_elk_action_worker`。

接入后，需要确认对应 Module 的 `STREAM_NAME` 与告警 Stream 名称一致。
