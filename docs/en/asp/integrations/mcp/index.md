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
| `add_comment` | Add comments to Case, Alert, Artifact, and other resources, with attachments, replies, and @mentions |

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
| `list_playbook_templates` | List runnable Playbook definitions |
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
| `get_file` | Get file metadata and a download URL by `file_key` |

## Comments and Files

By default, MCP list tools do not return comment content, so Agents do not receive oversized context accidentally. To include comments, pass `include_comments=True` to `list_cases`, `list_alerts`, `list_artifacts`, `list_playbooks`, or `search_knowledge`; `comments_limit` defaults to 20 and is capped at 50. `include_related` controls related records only and does not implicitly include comments.

Returned comments include `id`, `body`, `author`, `created_at`, `updated_at`, `parent_id`, and `attachments`. Attachments contain metadata only: `file_key`, `filename`, `size`, `content_type`, and `download_url`. File content is not inlined.

`get_file(file_key)` is the unified MCP file lookup entry point. It returns metadata and `download_url`; it does not return text, bytes, or base64. Agents or user code should download the file from `download_url` and process it according to the file type.

To upload a file, first call the REST attachment endpoint with the same API Key, then pass the returned `access_key` as `file_key` to `add_comment`:

```bash
curl -sS "https://asp.example.com/api/attachments/" \
  -H "Authorization: Api-Key $ASP_MCP_API_KEY" \
  -F "file=@./evidence.bin"
```

`add_comment(target_id, body="", file_keys=None, parent_id=None, mentions=None)` supports:

- `file_keys`: one or more attachment `access_key` / `file_key` values.
- `parent_id`: reply to an existing comment on the same resource.
- `mentions`: username list, with numeric user ID compatibility.
- `body`: may be empty only when at least one `file_key` is provided.

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
