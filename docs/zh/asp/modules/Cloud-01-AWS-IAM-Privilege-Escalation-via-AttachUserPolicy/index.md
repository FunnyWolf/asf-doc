# Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy

检测 AWS IAM `AttachUserPolicy` API 调用，该操作可用于权限提升或维持持久化访问。

- MITRE ATT&CK: **T1098.003 - Additional Cloud Credentials**
- 展示 CloudTrail 日志到 ASP Alert 的映射、Artifact 拆分和 Case 聚合

## 日志来源

日志来源于 [Mock 插件](../../integrations/Mock/index.md) 的 `CloudGenerator`，生成模拟 AWS CloudTrail
日志。

字段说明见 [siem-aws-cloudtrail.yaml](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/DATA/PLUGINS/SIEM/siem-aws-cloudtrail.yaml).

## 关键处理逻辑

- **字段提取：** 从 `userIdentity` 提取操作者身份，从 `requestParameters` 提取目标用户和策略 ARN
- **Artifact：** 操作者（用户名/ARN/AccessKey）、目标用户、来源 IP、策略 ARN、账号 ID，每个 Artifact 通过 CMDB 自动富化
- **聚合：** 按 `[账号, 操作者, 目标用户]` 在 24h 内聚合为同一 Case
- **严重程度：** 根据 `event.risk_score` 映射（>=90 Critical，>=70 High，>=40 Medium）
- **处置判定：** `UnauthorizedOperation` → UNAUTHORIZED/DENIED，其他错误 → ERROR，成功 → DETECTED
