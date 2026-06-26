# Agentic SOC Platform

ASP 是一个开源的安全运营平台，为安全团队提供从告警接入、自动聚合、AI 分析到响应处置的完整工作流。

与传统 SIEM/SOAR 不同，ASP 中的 AI Agent 不只是辅助工具——它们主动参与告警分诊、案件调查和知识沉淀，分析师的角色从"逐条处理告警"转变为"审查 AI 报告并做出决策"。

## 核心能力

**告警自动处理**
Module 框架持续消费 SIEM 告警，自动提取 IOC、关联聚合，将原始日志转换为结构化的 Case/Alert/Artifact 三级体系。

**AI 秒级生成调查报告**
内置 LLM 分析流水线，将原本需要数小时的人工分析压缩为秒级输出，自动生成包含判决、攻击链、IOC 和修复建议的调查报告。

**自动化剧本**
Playbook 支持一键触发：案件深度调查、从已处理案件中提取知识、为 Artifact 附加威胁情报富化。基于 Python 自定义扩展。

**Code Agent 集成**
通过 MCP 协议与 Claude Code 深度集成，提供专业安全 Agent 和 Skill，分析师可在 AI Agent 中直接操作 Case、搜索 SIEM 日志、查询威胁情报、编写模块和剧本。

**知识持续积累**
从已关闭案件中自动提取可复用的安全知识，持续构建组织级知识库，提升后续案件的分析效率和准确性。

**灵活定制**
模块、插件、Playbook 均为 Python 脚本，遵循约定即可接入新的 SIEM 规则、威胁情报源或自动化流程。内置 SIRP 前端支持 UI、数据模型、工作流自定义。

**私有化部署**
全部本地化部署，数据不出内网。采用 MIT 开源许可证。

**主流设计** 
ASP 的核心数据模型（Case/Alert/Artifact/Enrichment/Playbook/Knowledge）和设计理念参考了业界领先的 SOAR / Agentic SOC 平台（如 Splunk SOAR、Swimlane SOAR、aliyun Agentic SOC、Google Agentic SOC），确保了工作流程的专业性和通用性。

## 架构图

![arch.jpg](arch.jpg)

## 立即开始

- [环境配置](../../development/environment_setup/index.md) — 快速部署 ASP
- [模块开发](../../modules/development/index.md) — 编写告警处理模块
- [剧本开发](../../playbooks/development/index.md) — 编写自动化剧本
- [SIRP 平台](../../../sirp/Introduction/what_is_sirp/index.md) — 了解内置前端应用

## 许可证

[MIT](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/LICENSE) 开源许可证。
