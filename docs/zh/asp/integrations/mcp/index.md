# MCP

MCP（Model Context Protocol）是一个开放协议，让 LLM 可以通过标准化接口调用外部工具。ASP 内置 MCP Server，提供 Case、Alert、SIEM、Knowledge 等能力的 Tools，供 Claude Code 等 Harness Agent 调用。

## 配置

### 环境变量

| 变量 | 说明 |
|------|------|
| `ASP_MCP_URL` | MCP Server 地址，如 `https://asp.example.com/api/mcp` |
| `ASP_MCP_API_KEY` | API Key，用于认证 |

### 创建 API Key

在 [个人中心](../../workspace/personal-center/) 的 API Keys 中创建，密钥以 `asp_` 开头。

## 连接方式

ASP MCP Server 使用 Streamable HTTP 协议，端点为 `/api/mcp`。

认证方式：

```text
Authorization: Api-Key <your-api-key>
```

## 测试连接

PowerShell：

```powershell
$env:ASP_MCP_URL = "https://asp.example.com/api/mcp"
$env:ASP_MCP_API_KEY = "asp_xxx"

Invoke-RestMethod $env:ASP_MCP_URL -Method Post `
  -Headers @{Authorization="Api-Key $env:ASP_MCP_API_KEY"; Accept="application/json, text/event-stream"} `
  -ContentType "application/json" `
  -Body '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

Bash：

```bash
export ASP_MCP_URL="https://asp.example.com/api/mcp"
export ASP_MCP_API_KEY="asp_xxx"

curl -sS "$ASP_MCP_URL" \
  -H "Authorization: Api-Key $ASP_MCP_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

返回 MCP initialize 结果表示连接成功。

## 可用工具

ASP MCP Server 提供以下 Tools：

### Case

| 工具 | 说明 |
|------|------|
| `list_cases` | 查询 Case 列表，支持按状态、严重性、判定等筛选 |
| `update_case` | 更新 Case 的人工评估字段（severity、confidence、impact、priority、verdict、summary） |
| `add_comment` | 在 Case、Alert、Artifact 等资源上添加评论 |

### Alert

| 工具 | 说明 |
|------|------|
| `list_alerts` | 查询 Alert 列表，支持按状态、严重性、关联 ID 筛选 |

### Artifact

| 工具 | 说明 |
|------|------|
| `list_artifacts` | 查询 Artifact 列表，支持按类型、角色、值筛选 |

### Enrichment

| 工具 | 说明 |
|------|------|
| `create_enrichment` | 创建 Enrichment 记录并挂载到 Case、Alert 或 Artifact |

### Knowledge

| 工具 | 说明 |
|------|------|
| `search_knowledge` | 按关键词搜索知识库 |
| `update_knowledge` | 更新知识条目的标题、正文、标签或过期时间 |

### Playbook

| 工具 | 说明 |
|------|------|
| `list_playbook_definitions` | 列出可运行的 Playbook 定义 |
| `execute_playbook` | 从 Case 执行 Playbook |
| `list_playbooks` | 查询 Playbook 运行记录 |

### SIEM

| 工具 | 说明 |
|------|------|
| `siem_explore_schema` | 探索可用的 SIEM 索引和字段 |
| `siem_keyword_search` | 按关键词搜索 SIEM 日志 |
| `siem_adaptive_query` | 结构化查询 SIEM 日志 |
| `siem_discover_index_fields` | 发现索引字段并采样 |
| `siem_execute_spl` | 执行 Splunk SPL 查询 |
| `siem_execute_esql` | 执行 ELK ES\|QL 查询 |

### 其他

| 工具 | 说明 |
|------|------|
| `ti_query` | 查询 IOC 的威胁情报 |
| `cmdb_lookup` | 查询 Artifact 的资产、身份上下文 |

## 常见问题

### 401 / Invalid API key

- 检查 API Key 是否过期
- 检查用户是否被禁用
- 确认请求头格式为 `Authorization: Api-Key <key>`

### 连接失败

- 确认 MCP Server 已启动（ASGI 服务，端口 8001）
- 确认 `/api/mcp` 路由到 ASGI 服务
- 开发环境：检查 Vite 代理配置
- 生产环境：检查 Nginx 配置

### 工具不可用

- 确认 ASGI 服务已启动并正常运行
- 检查 MCP Server 日志是否有错误

## 相关链接

- [环境搭建](../../development/environment-setup/) — 开发环境配置
- [ClaudeCode 插件](../claude-code/) — Claude Code 的 Agent 和 Skill
