# 0.1.1 - 秩序之前的混乱

![img.png](img.png)

## 新功能亮点

- [Message](../../sirp/Feature/message/) 存储 Agent 运行时的所有消息记录, 包括系统消息, 人类消息, AI 消息和工具消息, 方便审计和调试.
- [Agents](../../asf/AGENTS/development/) 基础智能体框架,支持 `CMDB`,`SIEM`,`ThreatIntelligence`,`Knowledge`四个开箱即用智能体.
- [Qdrant](../../asf/PLUGINS/Qdrant/) Qdrant 向量数据库插件, 支持向量数据存储与检索.
- [Embeddings](../../asf/PLUGINS/Embeddings/) Embeddings 插件, 支持 OpenAI 和 Ollama 的 Embedding 模型, 支持Chroma 和 Qdrant 两种向量数据库.
- [Knowledge](../../sirp/Feature/knowledge/) 知识库, 支持知识库管理及 Agent 的知识库调用.
- [Case_L3_SOC_Analyst_Agent_With_Tools](../../asf/PLAYBOOKS/Case_L3_SOC_Analyst_Agent_With_Tools/) `SOC L3 分析师智能体 (工具调用)` 剧本,调用 `知识库` 进行 L3 分析.
- 更新 SIRP 到 Nocoly 7.0.0 版本.

## 优化

- 优化 Playbook 模板代码
- 更新 `Playbook` `Case_Threat_Hunting_Agent` 提示词
- 优化 SIRP 于 ASP 交互逻辑, SIRP 不再主动调用 ASP API, 由 ASP 通过轮询方式获取 SIRP 数据.
- 添加 ollama 的 Basic Auth 的 Nginx 配置
- 优化 `Case_L3_SOC_Analyst_Agent_With_Tools` 和 `Case_Threat_Hunting_Agent` 工具调用,防止因工具报错导致剧本无限循环.
- 优化 Redis/SIRP 网络连接性能,提升大规模部署时的稳定性.

## 开发者笔记

本次更新都是围绕 `Knowledge` 这个功能, 以及为知识库提供支持的相关插件和智能体.

知识库是 SOC 自动化分析和响应的关键组成部分, 它使得智能体能够基于组织特定的知识进行更准确的分析和决策.

通过引入 `Mem0` `Qdrant` 插件和 `Knowledge` 智能体, 我们为用户提供了一个强大的工具, 以管理和利用他们的知识资产.

下一个版本主要专注于数据标准化,针对当前 SIRP 中 Case/Alert/Artifact 数据结构重新设计.