# Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy

- 展示如何将其他格式的告警日志(AWS cloudtrail)映射到 ASP Alert (OCSF Finding)
- 展示如何拆分 Artifact, 如何生成 correlation_uid 以便于将关联的 Alert 组合成 Case

## 模块架构

- 模块的日志来源于 [Mock 插件](../../PLUGINS/MCP/) 的 CloudGenerator (生成 AWS cloudtrail 日志),日志说明的 [yaml](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/DATA/Plugin_SIEM_Indexes/siem-aws-cloudtrail.yaml)