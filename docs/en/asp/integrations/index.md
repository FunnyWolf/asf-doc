# Integrations

ASP currently保留以下集成入口：

| Integration | Description |
|-------------|-------------|
| [MCP](mcp/) | Model Context Protocol, allows LLMs to operate ASP through a standardized interface. |
| [ClaudeCode Plugin](claude-code/) | Enables Agents and Skills in ClaudeCode to use ASP's Case, Alert, Artifact, SIEM, Playbook, and other capabilities. |
| [Webhook](webhook/) | Receives Splunk / Kibana alerts, allowing external detection systems to send alerts into ASP. |
| [ELK Index Action](elk-index-action/) | Polls alerts from Elasticsearch indexes written by Kibana actions. |

SIEM, LLM, LDAP, Threat Intelligence, and other runtime configurations are placed in system settings and are not independent main lines in the integrations chapter.
