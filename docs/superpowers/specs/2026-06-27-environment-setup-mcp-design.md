# Environment Setup & MCP Documentation Optimization

**Date**: 2026-06-27
**Scope**: 优化开发环境文档，新增 MCP 独立文档

## Problem

当前 `environment-setup` 文档缺少关键内容：
- 架构概览（WSGI、ASGI、Workers 的职责）
- ASGI 启动说明（如何启动 MCP 服务）
- 前后端对接方式（开发环境和生产环境的路由差异）
- MCP 配置和使用指南

## Solution

1. 增强 `environment-setup.md`，补充架构、ASGI、前后端对接内容
2. 新增 `integrations/mcp.md`，独立的 MCP 使用指南

## Design

### 文档结构

```
development/
├── index.md              # 开发概览（保持不变）
├── environment-setup.md  # 增强版（重写）
├── module-examples.md    # 保持不变
├── playbook.md           # 保持不变
├── siem-yaml.md          # 保持不变
└── mock-data.md          # 保持不变

integrations/
├── index.md              # 集成概览（更新，添加 MCP 链接）
├── mcp.md                # MCP 使用指南（新增）
├── claude-code/
├── webhook/
├── elk-index-action/
└── ...
```

### environment-setup.md 内容设计

#### 架构概览

解释三个核心组件：

| 组件 | 技术 | 端口 | 职责 |
|------|------|------|------|
| WSGI | gunicorn / runserver | 8000 | Django REST API |
| ASGI | uvicorn | 8001 | MCP Server (Starlette + Django) |
| Workers | Python manage.py | - | 后台任务处理 |

路由规则：
- `/api/mcp` → ASGI (MCP Server)
- `/api/*` → WSGI (Django API)
- `/admin/*` → WSGI (Django Admin)

#### 开发依赖服务

保持现有内容：Docker Compose 启动 PostgreSQL、Redis Stack、RustFS。

#### 后端

保持现有内容：安装依赖、配置 .env。

#### 启动 WSGI（API 服务）

```bash
# 方式 1：Django 开发服务器
python manage.py runserver

# 方式 2：Gunicorn（更接近生产环境）
gunicorn asp.wsgi:application --bind 0.0.0.0:8000 --reload
```

#### 启动 ASGI（MCP 服务）

```bash
uvicorn asp.asgi:application --host 0.0.0.0 --port 8001 --reload
```

说明：
- ASGI 应用使用 Starlette 路由
- `/api/mcp` → MCP Server（FastMCP）
- `/` → Django 应用

#### 启动 Workers

保持现有内容：4 个 worker 命令。

#### 前端

```bash
cd frontend
pnpm install
pnpm dev
```

Vite 代理配置：
- `/api` → `http://localhost:8000`

#### 前后端对接

**开发环境**：
- 前端 Vite dev server (port 5173)
- `/api` 代理到 `http://localhost:8000`（WSGI）
- MCP 需要单独启动 ASGI (port 8001)，前端直接连接

**生产环境**：
- Nginx 统一入口 (port 443)
- `/api/mcp` → ASGI (port 8001)
- `/api/` → WSGI (port 8000)
- `/` → 静态文件（前端）

#### Custom 目录

保持现有内容。

### integrations/mcp.md 内容设计

#### 什么是 MCP

- Model Context Protocol 简介
- ASP 的 MCP Server 提供 Tools，让 LLM 可以操作 Case、查询 SIEM、管理知识等

#### 配置

环境变量：
- `ASP_MCP_URL`: MCP Server 地址，如 `https://asp.example.com/api/mcp`
- `ASP_MCP_API_KEY`: API Key

API Key 创建：链接到个人中心文档。

#### 连接方式

- 协议：Streamable HTTP
- 认证：`Authorization: Api-Key <key>`

#### 测试连接

PowerShell 和 Bash 测试命令。

#### 可用工具

列出所有 MCP Tools：
- Case 相关：list_cases, update_case
- Alert 相关：list_alerts
- Artifact 相关：list_artifacts
- Enrichment 相关：create_enrichment
- Knowledge 相关：search_knowledge, update_knowledge
- SIEM 相关：siem_explore_schema, siem_keyword_search, siem_adaptive_query, siem_execute_spl, siem_execute_esql
- Playbook 相关：list_playbook_definitions, execute_playbook, list_playbooks
- CMDB 相关：cmdb_lookup
- Threat Intelligence 相关：ti_query

#### 常见问题

- 401 / Invalid API key：检查 API Key 是否过期、用户是否被禁用
- 连接失败：检查 /api/mcp 是否路由到 ASGI 服务
- 工具不可用：检查 ASGI 服务是否启动

#### 相关链接

- ClaudeCode 插件
- 环境搭建

### integrations/index.md 更新

添加 MCP 到集成列表：

| 集成 | 说明 |
|------|------|
| [MCP](mcp/) | Model Context Protocol，让 LLM 操作 ASP |
| [ClaudeCode 插件](claude-code/) | Claude Code 的 Agent 和 Skill |
| [Webhook](webhook/) | 接收外部告警 |
| [ELK Index Action](elk-index-action/) | 从 Elasticsearch 轮询告警 |

## 文件清单

| 文件 | 操作 |
|------|------|
| `docs/zh/asp/development/environment-setup/index.md` | 重写 |
| `docs/en/asp/development/environment-setup/index.md` | 重写 |
| `docs/zh/asp/integrations/mcp/index.md` | 新增 |
| `docs/en/asp/integrations/mcp/index.md` | 新增 |
| `docs/zh/asp/integrations/index.md` | 更新 |
| `docs/en/asp/integrations/index.md` | 更新 |
| `docs/.vitepress/config/zh.ts` | 更新侧边栏 |
| `docs/.vitepress/config/en.ts` | 更新侧边栏 |

## 验证

- 所有内部链接可访问
- 中英文内容一致
- 代码示例可执行
