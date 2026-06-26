# Enrichment

Enrichment 是附加到 Case、Alert 或 Artifact 的外部上下文。

## 关键字段

- Enrichment ID：系统生成的可读 ID。
- Name：富化名称。
- Type：富化类型，例如 Threat Intelligence、Reputation、CMDB、Identity、History。
- Provider：数据来源，例如 AlienVaultOTX、Internal CMDB、MCP、Splunk、Elastic。
- UID：外部稳定标识，用于去重。
- Value：富化值。
- Desc：摘要。
- Data：完整 JSON 数据。

## 关联目标

Enrichment 可以关联到：

- Case
- Alert
- Artifact

同一个调查过程中，威胁情报、资产、身份和历史上下文都可以通过 Enrichment 统一呈现。
