# 0.2.0 - MCP 和 Claude Code Plugin

## 新功能
- [SIEM Plugin](../../asf/PLUGINS/SIEM/) 支持Splunk / ELK, 可添加自定义日志配置信息, 添加适用于 LLM 的, 统一的日志检索接口.
- [MCP Plugin](../../asf/PLUGINS/MCP/) 正式版本,支持 ASP 大部分核心功能
- [Claude Code Plugin](../../asf/PLUGINS/ClaudeCode/) , 内置 MCP 连接, 8个 Skill, 1个 agent

## 优化
- SIRP 优化 UI 布局和字段的权限控制
- 删除 Dify / Mem0 插件, 删除 Neo4j / Chroma 支持 


## 开发者笔记

SIEM 是 SOC 中的核心平台,承载着所有的日志数据, 无论人员还是 LLM 都需要接口从 SIEM 搜索日志来进行信息富化或者调查. 

Splunk 是商业化 SIEM 的领导者, ELK 是开源届 SIEM 最优解决方案, 所以 ASP 首先选择支持这两个平台. ASP 将日志接口统一化, 外部调用无需关心具体的 SIEM 实现方案. 

SIEM 平台当前不支持在平台中添加对日志的说明 (例如某个 index 的具体用途, index 中某个字段的说明), 传统方式是使用外部的 wiki 存储这类信息, 安全人员通过查看文档来确认日志用途, 但这种方案不利于集成和 LLM 的调用和分析. ASP 使用 yaml 文件存储这类数据, 并统一成一个外部接口, 方便 LLM 调用 (也可以作为 Claude Code Plugin 中的 Reference 文件, 但这种实现代码中无法调用).

在当前环境下,用户使用自然语言与平台或者软件对话来进行操作是刚性需求. 当前有两种方案: 
- 平台自身实现 UI 层的对话接口和 Harness Engineering 
- 与外部的 Harness Engineering 集成 

无论系统成熟度,用户接受程度,工作量等多个角度来说, 第二个方案是最优选择.

ASP 需要提供接口可以让 LLM 进行操作,有两种选择:
- 使用 MCP Server, 将各个功能封装成 API (Tools),供外部工具调用
- 实现一个 cli,通过命令行参数实现渐进式的功能暴露

ASP 选择第一个方案,先说优点: 
- 有成熟的框架 (fastmcp) 
- 函数使用 pydantic 和 typing 就可以将入参说明,函数,返回值说明等直接暴露,无需额外操作 
- 主流工具都支持直接对接

再说缺点:
- MCP 当前还不支持渐进式加载,会固定的占用上下文

cli 工具的优点是可以 --help 来实现渐进式加载, 缺点是 LLM 在使用时会增加一部分 Tools 调用请求,且因为没有成熟的工程化方案,实现工作量很大.

考虑到 ASP 的目标用户都是专业的网络安全技术人员, 对命令行的接受度较高, 所以 Claude Code 就成为了 Harness Engineering 工具的首选.

MCP Server 确保提供的 Tools 功能原子化,尽量的压缩说明内容,确保占用最小的上下文. 将详细的使用方法和经典的 SOP 拆分成不同的 Skill,也方便优化和自定义. 如果需要更加复杂的,长时间的,独立上下文的工作流,可以使用 Agent, ASP 提供了一个 Case 调查的 Agent 作为参考和初始版本.

在 ASP 可以与 Claude Code 等外部工具对接后, Dify 等带 UI 的工作流就没有必要了,所有的和用户交互,记忆管理,多 Agent 都交由 Claude Code 实现.

Mem0 的优点是简单的接口,原生的 GraphRAG 支持,缺点是依赖外部图数据库 (neo4j),构建 GraphRAG 时需要 调用 LLM 进行额外分析,性能不佳.

Mem0 主要场景是个人助理和长期记忆, 而 ASP 使用 RAG 是作为知识库使用,为 Secops 提供参考信息,通常也不会很大. 实际工作中使用关键字和语义混合搜索 (通过稀疏向量和稠密向量实现) 就可以达到性能要求.通过加大返回结果数和使用 rerank 模型,准确度也有保证.

Neo4j 用于 Mem0, 在不使用 Mem0 后也是不必要的. Qdrant 插件已经集成到 ASP ,同时支持稀疏向量和稠密向量存储, 所以 Chroma 也不必要了.