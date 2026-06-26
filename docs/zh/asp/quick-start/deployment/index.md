# 部署

ASP 后端是 Django，前端是 Vite + Ant Design。部署前需要准备 PostgreSQL、Redis、S3 兼容对象存储、Python 环境和 Node.js 环境。

## 后端

进入 `backend` 目录后使用项目内虚拟环境运行管理命令。

安装依赖：

```powershell
uv sync
```

配置 `.env`，至少确认以下运行依赖：

| 配置 | 说明 |
| --- | --- |
| `DB_NAME` / `DB_USER` / `DB_PASSWORD` / `DB_HOST` / `DB_PORT` | PostgreSQL 连接。 |
| `REDIS_URL` | Redis 连接，例如 `redis://localhost:6379/1`。 |
| `S3_ENDPOINT_URL` / `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_STORAGE_BUCKET_NAME` | 附件和头像使用的 S3 兼容存储。 |
| `DJANGO_SECRET_KEY` | 生产环境必须设置。 |
| `DJANGO_ALLOWED_HOSTS` | 生产环境允许访问的主机名。 |

执行数据库迁移并启动开发服务：

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

后端 API 默认挂载在 `/api/` 下。首次部署后应先完成数据库迁移，再创建管理员账号。

创建管理员账号：

```powershell
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## 后台 worker

开发或生产环境需要按实际功能启动对应 worker：

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

MCP 端点挂载在 ASGI 应用的 `/api/mcp`。如果需要 ClaudeCode 插件，生产环境需要把 `/api/mcp` 路由到 ASGI 服务。

后端普通 API/Admin 可以走 WSGI，MCP 走 ASGI。

## 前端

进入 `frontend` 目录安装依赖并启动开发服务：

```powershell
npm install
npm run dev
```

生产环境可以按项目实际部署方式构建前端并反向代理到后端 API。

## 文档站

本文档位于 `asf-doc`：

```powershell
npm install
npm run docs:dev
```
