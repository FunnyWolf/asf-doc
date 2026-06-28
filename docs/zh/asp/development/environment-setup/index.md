# 开发环境搭建

本页用于源码开发和本地调试。生产或单机私有化部署请优先使用 [部署](../../quick-start/deployment/) 中的 Docker Compose 分发包。

## 架构概览

ASP 后端由三类进程组成：

| 进程 | 技术 | 端口 | 职责 |
|------|------|------|------|
| WSGI | gunicorn / runserver | 8000 | Django REST API，处理所有 `/api/` 请求 |
| ASGI | uvicorn | 8001 | MCP Server，处理 `/api/mcp` 请求 |
| Workers | manage.py 命令 | — | 后台任务：Module 消费、Case 分析、Playbook 执行、ELK 轮询 |

路由规则：

```text
/api/mcp  → ASGI (Starlette → FastMCP)
/api/*    → WSGI (Django REST Framework)
/admin/*  → WSGI (Django Admin)
```

前端通过 Vite 代理（开发环境）或 Nginx（生产环境）统一访问后端。

## 开发依赖服务

开发环境可以使用 `development/docker` 启动后端依赖服务：

```powershell
Set-Location D:\Code\git\agentic-soc-platform\development\docker
Copy-Item .env.example .env
docker compose up -d
```

该 Compose 会启动 PostgreSQL、Redis Stack 和 RustFS：

| 服务 | 地址 | 说明 |
|------|------|------|
| PostgreSQL | `localhost:5432` | 后端数据库。 |
| Redis | `localhost:6379` | Cache 和 Redis Stream。 |
| Redis Stack UI | `http://localhost:8001` | Redis Web 管理界面。 |
| RustFS S3 API | `http://localhost:9000` | 附件和头像使用的 S3 兼容接口。 |
| RustFS Console | `http://localhost:9001` | RustFS Web 管理界面。 |

对应后端 `.env` 示例：

```text
POSTGRES_DB=asp
POSTGRES_USER=postgres
POSTGRES_PASSWORD=asp-dev-postgres-password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=1
REDIS_PASSWORD=asp-dev-redis-password

RUSTFS_ENDPOINT_URL=http://localhost:9000
RUSTFS_ACCESS_KEY=asp
RUSTFS_SECRET_KEY=asp-dev-rustfs-password
RUSTFS_BUCKET=asp
RUSTFS_REGION=us-east-1
```

## 后端

进入 `backend` 目录后使用项目内虚拟环境运行管理命令。

安装依赖：

```powershell
uv sync
```

配置 `.env`，至少确认以下运行依赖：

| 配置 | 说明 |
|------|------|
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT` | PostgreSQL 连接。 |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_DB` / `REDIS_PASSWORD` | Redis 连接。 |
| `RUSTFS_ENDPOINT_URL` / `RUSTFS_ACCESS_KEY` / `RUSTFS_SECRET_KEY` / `RUSTFS_BUCKET` | RustFS / S3 兼容对象存储。 |
| `DJANGO_SECRET_KEY` | 本地开发可使用测试值，生产必须设置为随机密钥。 |
| `DJANGO_ALLOWED_HOSTS` | 允许访问的主机名。 |

执行数据库迁移并创建管理员账号：

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## 启动 WSGI（API 服务）

```powershell
# 方式 1：Django 开发服务器（简单，自动重载）
.\.venv\Scripts\python.exe manage.py runserver

# 方式 2：Gunicorn（更接近生产环境，需安装 gunicorn）
.\.venv\Scripts\gunicorn asp.wsgi:application --bind 0.0.0.0:8000 --reload
```

启动后 API 可通过 `http://localhost:8000/api/` 访问。

## 启动 ASGI（MCP 服务）

```powershell
.\.venv\Scripts\uvicorn asp.asgi:application --host 0.0.0.0 --port 8001 --reload
```

ASGI 应用使用 Starlette 路由：

```text
/api/mcp  → FastMCP Server（MCP 协议端点）
/         → Django 应用（兜底路由）
```

启动后 MCP 端点可通过 `http://localhost:8001/api/mcp` 访问。

验证 ASGI 是否正常：

```powershell
curl http://localhost:8001/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

## 启动 Workers

开发时根据需要启动对应 worker：

```powershell
.\.venv\Scripts\python.exe manage.py run_agentic_module_worker
.\.venv\Scripts\python.exe manage.py run_agentic_case_analysis_worker
.\.venv\Scripts\python.exe manage.py run_agentic_playbook_worker
.\.venv\Scripts\python.exe manage.py run_elk_action_worker
```

| Worker | 作用 |
|--------|------|
| `run_agentic_module_worker` | 消费 Redis Stream，运行 Module 生成 Case / Alert / Artifact。 |
| `run_agentic_case_analysis_worker` | 执行 Case AI 分析任务。 |
| `run_agentic_playbook_worker` | 执行用户触发的 Playbook。 |
| `run_elk_action_worker` | 从 ELK Action Index 轮询告警。 |

## 前端

进入 `frontend` 目录安装依赖并启动开发服务：

```powershell
pnpm install
pnpm dev
```

前端默认通过 Vite 代理访问后端 API：

```text
http://localhost:5173/api/*  →  http://localhost:8000/api/*
```

如果需要在开发环境测试 MCP，前端需要额外代理 `/api/mcp` 到 ASGI 服务。可以在 `vite.config.ts` 中添加：

```typescript
server: {
  proxy: {
    '/api/mcp': { target: 'http://localhost:8001', changeOrigin: true },
    '/api': { target: 'http://localhost:8000', changeOrigin: true },
  },
}
```

## 前后端对接

### 开发环境

```text
浏览器 (localhost:5173)
  → Vite 代理
    → /api/mcp  → ASGI (localhost:8001)  [如果配置了代理]
    → /api/*    → WSGI (localhost:8000)
```

### 生产环境

```text
浏览器 (443)
  → Nginx
    → /api/mcp  → ASGI (asp-asgi:8001)
    → /api/*    → WSGI (asp-web:8000)
    → /*        → 静态文件（前端）
```

生产环境中 Nginx 负责路由分发，将 MCP 请求转发到 ASGI，其他 API 请求转发到 WSGI。

## Custom 目录

源码开发时，`backend/custom/` 与 Compose 发布包中的 `custom/` 目录结构保持一致：

```text
backend/custom/
  modules/
  playbooks/
  data/
    modules/
    siem/
    playbooks/
  requirements.txt
```

如需测试额外 Python 包，可以安装到本地 custom package 目录，并把它加入 `PYTHONPATH`：

```powershell
New-Item -ItemType Directory -Force .\.custom-packages
uv pip install --python .\.venv\Scripts\python.exe --target .\.custom-packages -r .\custom\requirements.txt
$env:PYTHONPATH = "$(Resolve-Path .\.custom-packages);$(Resolve-Path .\custom)"
```

刷新并校验 custom 定义：

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from apps.agentic.services.custom_scripts import refresh_custom_definitions; import json; print(json.dumps(refresh_custom_definitions(), ensure_ascii=False, indent=2))"
```
