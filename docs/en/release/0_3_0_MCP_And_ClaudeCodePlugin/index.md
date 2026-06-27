# 0.3.0 - MCP and Claude Code Plugin

## New Features
- [SIEM Plugin](../../asp/settings/siem/) supports Splunk / ELK, allows custom log configuration metadata, and adds a unified log retrieval interface for LLMs.
- [MCP Plugin](../../asp/integrations/claude-code/) reaches its official release and supports most core ASP capabilities.
- [Claude Code Plugin](../../asp/integrations/claude-code/) includes built-in MCP connectivity, 8 skills, and 1 agent.

## Improvements
- SIRP UI layout and field-level permission control have been improved.
- Removed the Dify / Mem0 plugins and dropped Neo4j / Chroma support.


## Developer Notes

SIEM is the core platform in a SOC and carries all log data. Both humans and LLMs need an interface to search logs in SIEM for enrichment or investigation.

Splunk is the leader in commercial SIEM, and ELK is the best-known open-source SIEM solution, so ASP first chose to support these two platforms. ASP standardizes the log interface so external callers do not need to care about the underlying SIEM implementation.

Current SIEM platforms do not support adding log descriptions directly in the platform itself, such as the purpose of a specific index or the meaning of fields within an index. The traditional approach is to store this information in an external wiki, where security personnel check the documentation to understand log usage, but that approach is not friendly to integration or to LLM-based retrieval and analysis. ASP stores this data in YAML files and exposes it through a unified external interface, which makes it easier for LLMs to consume. It can also serve as reference files in the Claude Code Plugin, although that approach cannot be called from code.

In the current environment, it is a hard requirement for users to operate platforms or software through natural-language conversation. There are currently two approaches:
- Implement a conversation interface and harness engineering directly in the platform UI.
- Integrate with external harness engineering.

From the perspectives of system maturity, user acceptance, and implementation effort, the second approach is the best choice.

ASP needs to expose interfaces that allow LLMs to operate it. There are two options:
- Use an MCP Server and wrap each feature as an API tool for external invocation.
- Implement a CLI and expose functionality progressively through command-line arguments.

ASP chose the first option. Its advantages are:
- It has a mature framework (fastmcp).
- With pydantic and typing, function signatures, parameter descriptions, and return-value descriptions can be exposed directly without extra work.
- Mainstream tools support direct integration.

Its drawback is:
- MCP does not yet support progressive loading, so it consumes context in a fixed way.

The advantage of a CLI is that `--help` can provide progressive loading. The downside is that LLM usage adds extra tool-call requests, and because there is no mature engineering pattern for this, the implementation effort is large.

Given that ASP's target users are professional cybersecurity practitioners and are generally comfortable with the command line, Claude Code becomes the preferred harness engineering tool.

The MCP Server ensures that the provided tools are atomic and that their descriptions are compressed as much as possible to minimize context usage. Detailed usage instructions and standard SOPs are split into separate skills, which also makes them easier to optimize and customize. If you need a more complex, long-running workflow with independent context, you can use an agent. ASP provides a case investigation agent as a reference and initial version.

Once ASP can integrate with external tools such as Claude Code, UI-based workflows like Dify are no longer necessary. All user interaction, memory management, and multi-agent orchestration are handled by Claude Code.

Mem0's strengths are its simple interface and native GraphRAG support. Its weaknesses are that it depends on an external graph database (Neo4j), requires extra LLM analysis when building GraphRAG, and performs poorly.

Mem0 is mainly designed for personal assistants and long-term memory, while ASP uses RAG as a knowledge base to provide reference information for SecOps and is usually not large. In practice, keyword and semantic hybrid search, implemented through sparse and dense vectors, is enough to meet performance requirements. Accuracy can also be ensured by increasing the number of returned results and using a rerank model.

Neo4j is used by Mem0, and once Mem0 is no longer used, it is unnecessary as well. The Qdrant plugin is already integrated into ASP and supports both sparse and dense vector storage, so Chroma is no longer needed either.