# 0.1.1 - Chaos Before Order

![img.png](img.png)

## New Feature Highlights

- [Message](../../sirp/Feature/message/) stores all message records during Agent runtime, including system messages, human messages, AI messages, and tool messages, facilitating auditing and debugging.
- [Agents](../../asf/AGENTS/development/) provides a basic agent framework, supporting four out-of-the-box agents: `CMDB`, `SIEM`, `ThreatIntelligence`, and `Knowledge`.
- [Qdrant](../../asf/PLUGINS/Qdrant/) is a Qdrant vector database plugin, supporting vector data storage and retrieval.
- [Neo4j](../../asf/PLUGINS/Neo4j/) is a Neo4j graph database plugin, used to support knowledge graph storage for the Mem0 plugin.
- [Mem0](../../asf/PLUGINS/Mem0/) is a Mem0 plugin, supporting Mem0 for managing knowledge bases and providing graph database support for knowledge bases and agents (Beta).
- [Embeddings](../../asf/PLUGINS/Embeddings/) is an Embeddings plugin, supporting OpenAI and Ollama's Embedding models, and two vector databases: Chroma and Qdrant.
- [Knowledge](../../sirp/Feature/knowledge/) knowledge base and [Knowledge](../../asf/AGENTS/Knowledge/) agent, supporting knowledge base management and agent's knowledge base calls.
- [Case_L3_SOC_Analyst_Agent_With_Tools](../../asf/PLAYBOOKS/Case_L3_SOC_Analyst_Agent_With_Tools/) is the `SOC L3 Analyst Agent (Tool Calling)` playbook, which calls the `Knowledge Base` for L3 analysis.
- Updated SIRP to Nocoly 7.0.0.

## Optimizations

- Optimized Playbook template code.
- Updated `Playbook` `Case_Threat_Hunting_Agent` prompts.
- Optimized SIRP and ASP interaction logic; SIRP no longer actively calls the ASP API, instead, ASP retrieves SIRP data through polling.
- Added Nginx configuration for Ollama's Basic Auth.
- Optimized `Case_L3_SOC_Analyst_Agent_With_Tools` and `Case_Threat_Hunting_Agent` tool calls to prevent infinite loops due to tool errors.
- Optimized Redis/SIRP network connection performance to improve stability during large-scale deployments.

## Developer Notes

This update primarily revolves around the `Knowledge` feature and related plugins and agents that support the knowledge base.

The knowledge base is a critical component of SOC automated analysis and response, enabling agents to perform more accurate analysis and decision-making based on organization-specific knowledge.

By introducing the `Mem0` and `Qdrant` plugins and the `Knowledge` agent, we provide users with a powerful tool to manage and utilize their knowledge assets.

The next version will focus on data standardization, redesigning the current SIRP Case/Alert/Artifact data structure.
