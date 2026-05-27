# Mail-01-User-Report-Phishing-Mail

分析终端用户上报的钓鱼邮件,提取发件人、URL、附件等 Artifact,并通过 correlation_uid 聚合为 Case.

- MITRE ATT&CK: **T1566.001 - Spearphishing Attachment**
- 该模块使用 Langgraph 构建 AI Agent,包含 `告警预处理`、`LLM分析`、`结果输出` 三个 Node,推荐作为 Langgraph 类型模块的参考

## 日志来源

日志来源于 `DATA/MODULES/Mail-01-User-Report-Phishing-Mail/mock_alert.py`,包含合法和恶意两类邮件样本,通过 `RedisStreamAPI` 发送到对应 Stream.

## 关键处理逻辑

- **字段提取**: 解析邮件 headers (From/To/Subject/Date/Return-Path/Authentication-Results) 和 body (plain_text/html)
- **可疑信号检测**: SPF/DKIM/DMARC 失败、可疑 URL (HTTP 或域名不匹配)、可疑附件扩展名、紧急关键词命中
- **Artifact**: 发件人/收件人邮箱、邮件主题、正文 URL、附件文件名
- **聚合**: 按 `[发件人]` (或归一化主题) 在 12h 内聚合为同一 Case
- **严重程度**: 可疑信号 >=3 → High, >=1 → Medium, 0 → Informational
