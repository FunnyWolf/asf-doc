# MCP

MCP (Model Context Protocol) is an open protocol that allows LLMs to call external tools through a standardized interface. ASP has a built-in MCP Server that provides Tools for Case, Alert, SIEM, Knowledge, and other capabilities, which can be called by Harness Agents like Claude Code.

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ASP_MCP_URL` | MCP Server address, e.g., `https://asp.example.com/api/mcp` |
| `ASP_MCP_API_KEY` | API Key for authentication |

### Create API Key

Create in [Personal Center](../../workspace/personal-center/) under API Keys. Keys start with `asp_`.

## Connection Method

ASP MCP Server uses Streamable HTTP protocol with endpoint at `/api/mcp`.

Authentication:

```text
Authorization: Api-Key <your-api-key>
```

## Test Connection

PowerShell:

```powershell
$env:ASP_MCP_URL = "https://asp.example.com/api/mcp"
$env:ASP_MCP_API_KEY = "asp_xxx"

Invoke-RestMethod $env:ASP_MCP_URL -Method Post `
  -Headers @{Authorization="Api-Key $env:ASP_MCP_API_KEY"; Accept="application/json, text/event-stream"} `
  -ContentType "application/json" `
  -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

Bash:

```bash
export ASP_MCP_URL="https://asp.example.com/api/mcp"
export ASP_MCP_API_KEY="asp_xxx"

curl -sS "$ASP_MCP_URL" \
  -H "Authorization: Api-Key $ASP_MCP_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

A returned MCP initialize result indicates a successful connection.

## Available Tools

ASP MCP Server provides the following Tools:

### Case

| Tool | Description |
|------|-------------|
| `list_cases` | Query Case list, supports filtering by status, severity, verdict, etc. |
| `update_case` | Update Case manual assessment fields (severity, confidence, impact, priority, verdict, summary) |
| `add_comment` | Add comments to Case, Alert, Artifact, and other resources |

### Alert

| Tool | Description |
|------|-------------|
| `list_alerts` | Query Alert list, supports filtering by status, severity, correlation ID |

### Artifact

| Tool | Description |
|------|-------------|
| `list_artifacts` | Query Artifact list, supports filtering by type, role, value |

### Enrichment

| Tool | Description |
|------|-------------|
| `create_enrichment` | Create Enrichment record and attach to Case, Alert, or Artifact |

### Knowledge

| Tool | Description |
|------|-------------|
| `search_knowledge` | Search knowledge base by keyword |
| `update_knowledge` | Update knowledge entry title, body, tags, or expiration time |

### Playbook

| Tool | Description |
|------|-------------|
| `list_playbook_definitions` | List runnable Playbook definitions |
| `execute_playbook` | Execute Playbook from Case |
| `list_playbooks` | Query Playbook run records |

### SIEM

| Tool | Description |
|------|-------------|
| `siem_explore_schema` | Explore available SIEM indexes and fields |
| `siem_keyword_search` | Search SIEM logs by keyword |
| `siem_adaptive_query` | Structured query for SIEM logs |
| `siem_discover_index_fields` | Discover index fields and sample data |
| `siem_execute_spl` | Execute Splunk SPL query |
| `siem_execute_esql` | Execute ELK ES\|QL query |

### Other

| Tool | Description |
|------|-------------|
| `ti_query` | Query threat intelligence for IOC |
| `cmdb_lookup` | Query asset and identity context for Artifact |

## Troubleshooting

### 401 / Invalid API key

- Check if the API Key has expired
- Check if the user account is disabled
- Confirm the request header format is `Authorization: Api-Key <key>`

### Connection failed

- Confirm the MCP Server is running (ASGI service, port 8001)
- Confirm `/api/mcp` routes to the ASGI service
- Development: Check Vite proxy configuration
- Production: Check Nginx configuration

### Tools not available

- Confirm the ASGI service is running and healthy
- Check MCP Server logs for errors

## Related Links

- [Environment Setup](../../development/environment-setup/) — Development environment configuration
- [ClaudeCode Plugin](../claude-code/) — Claude Code Agents and Skills
