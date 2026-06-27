# 开发环境搭建

本页用于源码开发和本地调试。生产或单机私有化部署请优先使用 [部署](../../quick-start/deployment/) 中的 Docker Compose 分发包。

## 开发依赖服务

开发环境可以使用 `development\docker` 启动后端依赖服务：

```powershell
Set-Location D:\Code\git\nodejs\sirp\development\docker
Copy-Item .env.example .env
docker compose up -d
```

该 Compose 会启动 PostgreSQL、Redis Stack 和 RustFS：

| 服务 | 地址 | 说明 |
| --- | --- | --- |
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
| --- | --- |
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT` | PostgreSQL 连接。 |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_DB` / `REDIS_PASSWORD` | Redis 连接。 |
| `RUSTFS_ENDPOINT_URL` / `RUSTFS_ACCESS_KEY` / `RUSTFS_SECRET_KEY` / `RUSTFS_BUCKET` | RustFS / S3 兼容对象存储。 |
| `DJANGO_SECRET_KEY` | 本地开发可使用测试值，生产必须设置为随机密钥。 |
| `DJANGO_ALLOWED_HOSTS` | 允许访问的主机名。 |

执行数据库迁移并启动开发服务：

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

后端 API 默认挂载在 `/api/` 下。首次初始化数据库后创建管理员账号：

```powershell
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## Custom 目录

源码开发时，`backend\custom\` 与 Compose 发布包中的 `custom\` 目录结构保持一致：

```text
backend\custom\
  modules\
  playbooks\
  data\
    modules\
    siem\
    playbooks\
  requirements.txt
```

如需测试额外 Python 包，可以安装到本地 custom package 目录，并把它加入 `PYTHONPATH`：

```powershell
New-Item -ItemType Directory -Force .\.custom-packages
uv pip install --python .\.venv\Scripts\python.exe --target .\.custom-packages -r .\custom\requirements.txt
$env:ASP_CUSTOM_DIR = (Resolve-Path .\custom).Path
$env:PYTHONPATH = "$(Resolve-Path .\.custom-packages);$env:ASP_CUSTOM_DIR"
```

刷新并校验 custom 定义：

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from apps.agentic.services.custom_scripts import refresh_custom_definitions; import json; print(json.dumps(refresh_custom_definitions(), ensure_ascii=False, indent=2))"
```

## 后台 worker

开发时根据需要启动对应 worker：

```powershell
.\.venv\Scripts\python.exe manage.py run_agentic_module_worker
.\.venv\Scripts\python.exe manage.py run_agentic_case_analysis_worker
.\.venv\Scripts\python.exe manage.py run_agentic_playbook_worker
.\.venv\Scripts\python.exe manage.py run_elk_action_worker
```

| Worker | 作用 |
| --- | --- |
| `run_agentic_module_worker` | 消费 Redis Stream，运行 Module 生成 Case / Alert / Artifact。 |
| `run_agentic_case_analysis_worker` | 执行 Case AI 分析任务。 |
| `run_agentic_playbook_worker` | 执行用户触发的 Playbook。 |
| `run_elk_action_worker` | 从 ELK Action Index 轮询告警。 |

## MCP

MCP 端点挂载在 ASGI 应用的 `/api/mcp`。如果要在开发环境测试 ClaudeCode 插件，需要把 `/api/mcp` 路由到 ASGI 服务。

后端普通 API/Admin 可以走 WSGI，MCP 走 ASGI。

## 前端

进入 `frontend` 目录安装依赖并启动开发服务：

```powershell
pnpm install
pnpm dev
```

前端 API 默认访问 `/api`，开发环境可通过 Vite 或反向代理转发到后端。

## 文档站

本文档位于 `asf-doc`：

```powershell
npm install
npm run docs:dev
```
