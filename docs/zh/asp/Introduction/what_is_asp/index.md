# Agentic SOC Platform

每天面对成千上万条告警,安全分析师的大部分时间花在重复性的日志筛选和报告撰写上.

ASP 用 AI 和自动化改变这一现状:原始告警自动聚合为可执行的案件,LLM 生成调查报告,分析师只需审查和决策.

## 核心能力

**告警自动处理**
Module 框架持续消费 SIEM 告警,自动提取 IOC、关联聚合,将原始日志转换为结构化的 Case / Alert / Artifact 三级体系.

**AI 调查分析**
内置 LLM 分析流水线,自动生成包含判决结果、攻击链、时间线、IOC 和修复建议的结构化调查报告,写回 Case 供分析师审查.

**自动化剧本**
Playbook 支持一键触发:案件深度调查、从已处理案件中提取知识、为 Artifact 附加威胁情报富化.基于 Python 自定义扩展.

**Code Agent 集成**
通过 MCP 协议与 Claude Code 深度集成,提供专业安全 Agent 和 Skill,分析师可在 AI Agent 中直接操作 Case、搜索 SIEM 日志、查询威胁情报、编写模块和剧本.

**知识持续积累**
从已关闭案件中自动提取可复用的安全知识,持续构建组织级知识库,提升后续案件的分析效率和准确性.

**灵活定制**
模块、插件、Playbook 均为 Python 脚本,遵循约定即可接入新的 SIEM 规则、威胁情报源或自动化流程.内置 SIRP 前端支持 UI、数据模型、工作流自定义.

**私有化部署**
全部本地化部署,数据不出内网.采用 MIT 开源许可证.

## 立即开始

- [环境配置](../../Development/environment_setup/) — 快速部署 ASP
- [模块开发](../../MODULES/development/) — 编写告警处理模块
- [剧本开发](../../PLAYBOOKS/development/) — 编写自动化剧本
- [SIRP 平台](../../../sirp/Introduction/what_is_sirp/) — 了解内置前端应用

## 许可证

[MIT](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/LICENSE) 开源许可证.
