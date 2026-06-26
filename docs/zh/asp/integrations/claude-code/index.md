# ClaudeCode 插件

ClaudeCode 插件让安全 Agent 在 ClaudeCode 中使用 ASP 能力。asp-marketplace 后续会作为独立 GitHub 项目发布；本文档只说明它与 ASP 工作台的关系。

## 能力边界

插件围绕 ASP 当前资源工作：

- Case、Alert、Artifact、Enrichment、Knowledge。
- Playbook 和模块开发辅助。
- SIEM 搜索和索引 YAML 辅助。
- 威胁情报查询。

## Agents

当前插件包含的 Agent 方向：

- Case Investigator：围绕 Case 做调查。
- Artifact Investigator：围绕 Artifact 做上下文分析。
- Threat Hunting：面向威胁狩猎任务。

## Skills

当前插件包含的 Skill 方向：

- Alert / Artifact / Case / Enrichment / Knowledge。
- Playbook 与 Playbook Creator。
- Module Creator。
- SIEM Search、SIEM Index YAML、SIEM Rule。
- Threat Intelligence。
- CMDB、Comment。

## MCP 说明

MCP 是 ClaudeCode 插件连接 ASP 能力的机制之一。文档中不再把 MCP 作为独立插件主线；需要了解插件时，优先阅读本页和后续 asp-marketplace 独立仓库说明。
