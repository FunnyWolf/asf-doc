# 基础配置

首次部署后建议按以下顺序完成配置。

## 1. LLM Provider

在系统设置中添加至少一个 LLM Provider。常用字段包括：

- Name
- Base URL
- Model
- API Key
- Proxy
- Tags
- Priority
- Enabled

Tags 可用于区分 `fast`、`powerful`、`tool_calling`、`structured_output` 等模型能力。

## 2. SIEM

配置 Splunk 或 ELK，用于后续告警接入、日志搜索或自动化分析。

## 3. 威胁情报

启用 AlienVault OTX 后，Playbook 或富化流程可以把 IOC 查询结果写入 Enrichment。

## 4. LDAP

如果需要企业身份源，配置 LDAP 并通过测试功能确认连接可用。

## 5. Agentic Runtime

根据团队语言和运行规模配置 Agentic Runtime，例如提示词语言和 Stream 最大长度。
