# 什么是 Agentic SOC Platform

Agentic SOC Platform（ASP）是一个开源的安全运营平台，为安全团队提供从告警接入、自动聚合、AI 分析到响应处置的完整工作流。

ASP 把告警、案件、实体、富化结果、知识和自动化剧本放在同一套工作台中。分析师不再围绕单条告警反复切换工具，而是围绕 Case 审查证据、确认 AI 报告并做出处置决策。

## 为什么不是另一个 SIEM/SOAR

与传统 SIEM/SOAR 不同，ASP 中的 AI Agent 不只是辅助问答工具。它们可以参与告警分诊、案件调查、威胁情报富化、剧本执行和知识沉淀。

这意味着分析师的工作方式会从“逐条处理告警”转变为“审查 AI 分析结果并做最终判断”。平台负责聚合信息、补全上下文和推进重复流程，人负责判断风险、确认影响和决定响应动作。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| 告警自动处理 | Module 流式消费 SIEM / Webhook 告警，提取 IOC、关联聚合，并转换为 Case / Alert / Artifact 工作流。 |
| AI 调查报告 | LLM 自动生成结构化调查报告，给出严重性、置信度、影响、优先级和判定建议。 |
| 自动化剧本 | Playbook 支持一键触发案件调查、知识提取、威胁情报富化和 CMDB 富化，也可以扩展传统 SOAR 自动化动作。 |
| Harness Agent 集成 | 通过插件和 MCP 连接 Code Agent，让 Agent 可以操作 Case、搜索日志、查询威胁情报、编写模块和剧本。 |
| 知识持续积累 | 从已关闭 Case 中提取可复用经验，构建组织级安全知识库。 |
| 灵活定制 | 用 Python 自定义 Module 和 Playbook，低成本适配新的告警源、SIEM 规则、威胁情报源和自动化流程。 |
| 私有化部署 | 支持本地化部署，安全数据不出内网，采用 MIT 开源许可证。 |

ASP 的核心数据模型（Case、Alert、Artifact、Enrichment、Playbook、Knowledge）参考了主流 SOAR / Agentic SOC 平台的工作方式，确保流程对安全团队足够直观和通用。

## 适合谁使用

- 希望把 SIEM 告警收敛为可处置 Case 的安全运营团队。
- 希望在调查中使用 LLM，但又需要审计、留痕和人工决策的团队。
- 希望把威胁情报、资产、身份、历史记录等上下文统一挂到安全资源上的团队。
- 希望通过 Python 低成本定制告警处理逻辑和自动化剧本的团队。
- 希望让 ClaudeCode 等 Code Agent 进入安全运营流程的团队。

## 立即开始

- [快速部署](../quick-start/deployment/) — 部署 ASP 并启动文档中的基础工作流。
- [基础配置](../quick-start/basic-configuration/) — 配置 LLM、SIEM、威胁情报和 LDAP。
- [Case 工作台](../workspace/case/) — 了解分析师如何围绕 Case 处置安全事件。
- [Module 开发](../development/module-examples/) — 了解如何用 Module 流式处理告警。
- [Playbook 开发](../development/playbook/) — 了解如何把 LLM 分析和 SOAR 自动化编排在一起。
