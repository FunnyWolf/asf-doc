# 术语表

| 术语                   | 含义                                                                                          |
|----------------------|---------------------------------------------------------------------------------------------|
| Case                 | 安全案件，是管理和跟踪安全事件处理过程的主对象。包含状态、严重性、优先级、判定、负责人、摘要、AI 调查报告、讨论和关联 Playbook。                      |
| Alert                | 告警，通常来自 SIEM、EDR、云平台或 Webhook。Alert 关联到 Case，并保留规则、产品、MITRE、原始日志等上下文；分析员通常基于告警调查，不直接修改告警数据。 |
| Artifact             | 与安全事件相关的实体、证据项或 IOC，例如 IP、域名、URL、文件哈希、账号、主机、进程等。查询、响应和富化通常围绕 Artifact 展开。                   |
| Enrichment           | 富化结果，记录威胁情报、声誉、资产、身份、历史、处置建议等外部上下文。                                                         |
| Knowledge            | 知识，支持手动维护，也可以从已结案 Case 的调查记录和讨论中提取。用于沉淀 SOC 团队可复用的安全经验，并供 AI Agent 调用。                      |
| Playbook             | 自动化任务记录。当前从 Case 触发，记录剧本名称、用户输入、执行状态和后台任务 ID，常见状态包括 Pending、Running、Success、Failed。         |
| Investigation Report | AI 分析生成的结构化调查报告，通常包含判定、攻击链、IOC、影响和修复建议。                                                     |
| Raw Log              | Alert 的原始日志内容，通常以 JSON 保存，用于追溯告警来源和完整上下文。                                                   |
| Unmapped Data        | 原始告警中未映射到标准字段的数据。它保留原始信息，但通常不是 AI 默认分析的重点。                                                  |
| Module               | 用于流式处理告警的 Python 告警处理脚本。Module 从告警消息中提取字段和 IOC，进行关联聚合，并生成或更新 Case、Alert、Artifact。             |
| User Input           | 执行 Playbook 时由用户提供的自然语言补充要求，LLM 或自动化任务会在执行时参考。                                              |
| Inbox                | 站内消息，用于向用户发送系统或用户消息，可关联资源和附件。                                                               |
| Audit Log            | 审计日志，记录资源创建、更新、删除，以及变更字段和操作者。                                                               |
| LLM Provider         | 大模型配置项，包含名称、Base URL、模型、API Key、代理、标签和优先级。                                                  |
| Runtime              | Agentic 运行配置，目前包含提示词语言和 Stream 长度等参数；默认 Prompt Language 为 `en`，Stream Maxlen 为 `10000`。             |
| Harness Agent        | 通过插件和 MCP 连接 ASP 能力的 Harness Agent。它可以围绕 Case、Artifact、SIEM 日志、威胁情报、Module 和 Playbook 工作。   |
| Webhook              | 外部 SIEM 或告警系统接入 ASP 的入口，例如 Splunk / Kibana 告警可通过 Webhook 进入平台。                              |
| ELK Index Action     | Kibana 先把 action 写入 Elasticsearch 索引，再由 ASP worker 轮询读取并转换为告警的接入方式。                              |
| SIEM YAML            | 描述 Splunk / ELK 索引、字段和默认聚合字段的 YAML 配置，供 Agent / MCP 理解和查询日志。                                  |
| Personal Center      | 个人中心，当前用户维护个人资料、密码和 API Key 的入口。                                                          |
