# 开发环境搭建

本页用于源码开发和本地调试。生产或单机私有化部署请优先使用 [部署](../../quick-start/deployment/) 中的 Docker Compose 发布包。

> 本文默认使用 Linux/macOS shell。开发环境建议拆开运行：依赖服务用 Docker Compose，后端和前端在本机直接启动。这样方便调试代码、看日志、改前端和单独启动某个 Worker。

## 1. 进程和端口

ASP 本地开发会涉及三类后端进程：

| 进程 | 默认端口 | 职责 |
| --- | --- | --- |
| WSGI / Django | `8000` | Django REST API，处理 `/api/`。 |
| ASGI / MCP | `8002` | MCP Server，开发环境建议使用 `8002`，避免和 Redis Stack UI 的 `8001` 冲突。 |
| Workers | — | 后台任务：Module 消费、Case 分析、Playbook 执行、ELK 轮询。 |

路由关系：

```text
/api/*    -> WSGI / Django
/api/mcp  -> ASGI / MCP
```

> 生产环境中 ASGI 容器内部仍使用 `8001`。这里的 `8002` 只是本地开发建议端口。

## 2. 启动依赖服务

开发环境的 PostgreSQL、Redis Stack 和 RustFS 可以用 `development/docker` 启动：

```bash
cd /path/to/agentic-soc-platform/development/docker
cp .env.example .env
docker compose up -d
```

启动后可用服务：

| 服务 | 地址 | 用途 |
| --- | --- | --- |
| PostgreSQL | `localhost:5432` | 后端数据库。 |
| Redis | `localhost:6379` | Cache 和 Redis Stream。 |
| Redis Stack UI | `http://localhost:8001` | Redis Web 管理界面。 |
| RustFS S3 API | `http://localhost:9000` | 附件和头像使用的 S3 兼容接口。 |
| RustFS Console | `http://localhost:9001` | RustFS Web 管理界面。 |

> 如果端口被占用，优先调整 `development/docker/.env` 或 Compose 端口映射，再启动依赖服务。

## 3. 配置后端 `.env`

进入 `backend`，从示例文件创建本地 `.env`：

```bash
cd /path/to/agentic-soc-platform/backend
cp .env.example .env
```

至少确认这些配置和 `development/docker/.env` 一致：

```text
DJANGO_SECRET_KEY=dev-secret-key
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=*

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

> 这些值只适合本地开发。生产环境必须使用随机密钥和受控密码。

## 4. 初始化后端

安装依赖、执行迁移并创建管理员：

```bash
uv sync
.venv/bin/python manage.py migrate
.venv/bin/python manage.py createsuperuser
```

常用检查：

```bash
.venv/bin/python manage.py check
.venv/bin/python manage.py test
```

> 后端依赖由 `uv` 管理。运行管理命令时优先使用 `backend/.venv/bin/python`。

## 5. 启动后端 API

最常用方式是 Django 开发服务器：

```bash
.venv/bin/python manage.py runserver 0.0.0.0:8000
```

启动后：

- API: `http://localhost:8000/api/`

如果需要更接近生产环境，可以使用 Gunicorn：

```bash
.venv/bin/gunicorn asp.wsgi:application --bind 0.0.0.0:8000 --reload
```

## 6. 启动 MCP / ASGI

如果要调试 MCP，单独启动 ASGI：

```bash
.venv/bin/uvicorn asp.asgi:application --host 0.0.0.0 --port 8002 --reload
```

ASGI 路由：

```text
/api/mcp  -> FastMCP Server
/         -> Django fallback
```

验证 MCP 初始化：

```bash
curl http://localhost:8002/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

> 只有需要调试 MCP 时才必须启动 ASGI。普通前端和 REST API 开发只启动 Django API 即可。

## 7. 启动 Workers

按需启动后台进程：

```bash
.venv/bin/python manage.py run_agentic_module_worker
.venv/bin/python manage.py run_agentic_case_analysis_worker
.venv/bin/python manage.py run_agentic_playbook_worker
.venv/bin/python manage.py run_elk_action_worker
```

| Worker | 作用 |
| --- | --- |
| `run_agentic_module_worker` | 消费 Redis Stream，运行 Module 生成 Case / Alert / Artifact。 |
| `run_agentic_case_analysis_worker` | 执行 Case AI 分析任务。 |
| `run_agentic_playbook_worker` | 执行用户触发的 Playbook。 |
| `run_elk_action_worker` | 从 ELK Action Index 轮询告警。 |

> 不需要相关功能时可以不启动对应 Worker。例如只开发前端列表页时，通常只需要 Django API。

## 8. 启动前端

进入 `frontend` 安装依赖并启动 Vite：

```bash
cd /path/to/agentic-soc-platform/frontend
pnpm install
pnpm dev
```

默认访问：

```text
http://localhost:5173
```

默认 Vite 代理：

```text
http://localhost:5173/api/*  ->  http://localhost:8000/api/*
```

如果需要在前端调试 MCP，可以在 `vite.config.ts` 增加更具体的 `/api/mcp` 代理，并放在 `/api` 前面：

```typescript
server: {
  proxy: {
    '/api/mcp': { target: 'http://localhost:8002', changeOrigin: true },
    '/api': { target: 'http://localhost:8000', changeOrigin: true },
  },
}
```

> 前端修改不需要主动执行 `npm build`，除非明确要求验证构建。

## 9. 前后端请求链路

开发环境：

```text
Browser (localhost:5173)
  -> Vite proxy
    -> /api/mcp  -> ASGI (localhost:8002)  [可选]
    -> /api/*    -> WSGI / Django (localhost:8000)
```

生产环境：

```text
Browser (443)
  -> Nginx
    -> /api/mcp  -> ASGI (asp-asgi:8001)
    -> /api/*    -> WSGI / Django (asp-web:8000)
    -> /*        -> Frontend static files
```

## 10. Custom 目录

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

- `backend/custom/modules/`：自定义 Module。
- `backend/custom/playbooks/`：自定义 Playbook。
- `backend/custom/data/siem/`：自定义 SIEM YAML。
- `backend/custom/data/playbooks/`：自定义 Playbook Prompt。
- `backend/custom/requirements.txt`：自定义代码需要的额外 Python 包。

测试自定义依赖时，可以安装到本地 custom package 目录，并加入 `PYTHONPATH`：

```bash
mkdir -p .custom-packages
uv pip install --python .venv/bin/python --target .custom-packages -r custom/requirements.txt
export PYTHONPATH="$(pwd)/.custom-packages:$(pwd)/custom"
```

> 修改脚本或 YAML 后，可以在 ASP 前端的 [Custom Console](../custom-console/) 中执行 `Refresh / Validate`。
