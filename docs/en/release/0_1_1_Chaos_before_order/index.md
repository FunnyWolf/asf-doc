# 0.1.1 - Chaos Before Order

![img.png](img.png)

## New Feature Highlights

- ~~Message module~~ (deprecated, functionality integrated into other modules)
- ~~Agents basic framework~~ (deprecated, replaced by [ClaudeCode plugin](../../asp/PLUGINS/ClaudeCode/) agent system)
- ~~Qdrant vector database plugin~~ (deprecated)
- ~~Embeddings plugin~~ (deprecated)
- [Knowledge](../../sirp/Feature/knowledge/) base, supporting knowledge base management and agent's knowledge base calls.
- ~~Case_L3_SOC_Analyst_Agent_With_Tools playbook~~ (deprecated, replaced by [Playbook](../../asp/PLAYBOOKS/development/) system)
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
