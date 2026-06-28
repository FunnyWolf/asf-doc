# Environment Setup

This page is for source development and local debugging. For production or single-host private deployment, use the Docker Compose release package in [Deployment](../../quick-start/deployment/).

> This guide assumes a Linux/macOS shell by default. The recommended development setup is split: run dependency services with Docker Compose, then run backend and frontend processes directly on the host. This makes code debugging, log inspection, frontend changes, and individual Worker processes easier.

## 1. Processes and ports

Local ASP development involves three backend process types:

| Process | Default Port | Responsibility |
| --- | --- | --- |
| WSGI / Django | `8000` | Django REST API for `/api/`. |
| ASGI / MCP | `8002` | MCP Server. Use `8002` in development to avoid conflicting with Redis Stack UI on `8001`. |
| Workers | — | Background tasks: Module consumption, Case analysis, Playbook execution, ELK polling. |

Routing:

```text
/api/*    -> WSGI / Django
/api/mcp  -> ASGI / MCP
```

> In production, the ASGI container still uses internal port `8001`. The `8002` port here is only the recommended local development port.

## 2. Start dependency services

Use `development/docker` to start PostgreSQL, Redis Stack, and RustFS:

```bash
cd /path/to/agentic-soc-platform/development/docker
cp .env.example .env
docker compose up -d
```

Available services:

| Service | Address | Purpose |
| --- | --- | --- |
| PostgreSQL | `localhost:5432` | Backend database. |
| Redis | `localhost:6379` | Cache and Redis Stream. |
| Redis Stack UI | `http://localhost:8001` | Redis web management UI. |
| RustFS S3 API | `http://localhost:9000` | S3-compatible API for attachments and avatars. |
| RustFS Console | `http://localhost:9001` | RustFS web console. |

> If a port is already in use, adjust `development/docker/.env` or the Compose port mapping before starting dependency services.

## 3. Configure backend `.env`

Enter `backend` and create a local `.env` from the example:

```bash
cd /path/to/agentic-soc-platform/backend
cp .env.example .env
```

At minimum, make sure these values match `development/docker/.env`:

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

> These values are for local development only. Production must use random secrets and controlled passwords.

## 4. Initialize backend

Install dependencies, apply migrations, and create an administrator:

```bash
uv sync
.venv/bin/python manage.py migrate
.venv/bin/python manage.py createsuperuser
```

Common checks:

```bash
.venv/bin/python manage.py check
.venv/bin/python manage.py test
```

> Backend dependencies are managed by `uv`. Prefer `backend/.venv/bin/python` for management commands.

## 5. Start backend API

The common option is Django development server:

```bash
.venv/bin/python manage.py runserver 0.0.0.0:8000
```

After startup:

- API: `http://localhost:8000/api/`

For a setup closer to production, use Gunicorn:

```bash
.venv/bin/gunicorn asp.wsgi:application --bind 0.0.0.0:8000 --reload
```

## 6. Start MCP / ASGI

To debug MCP, start ASGI separately:

```bash
.venv/bin/uvicorn asp.asgi:application --host 0.0.0.0 --port 8002 --reload
```

ASGI routes:

```text
/api/mcp  -> FastMCP Server
/         -> Django fallback
```

Verify MCP initialization:

```bash
curl http://localhost:8002/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

> ASGI is only required when debugging MCP. Regular frontend and REST API development only needs the Django API process.

## 7. Start Workers

Start background processes as needed:

```bash
.venv/bin/python manage.py run_agentic_module_worker
.venv/bin/python manage.py run_agentic_case_analysis_worker
.venv/bin/python manage.py run_agentic_playbook_worker
.venv/bin/python manage.py run_elk_action_worker
```

| Worker | Purpose |
| --- | --- |
| `run_agentic_module_worker` | Consumes Redis Stream and runs Modules to generate Cases / Alerts / Artifacts. |
| `run_agentic_case_analysis_worker` | Runs Case AI analysis tasks. |
| `run_agentic_playbook_worker` | Runs user-triggered Playbooks. |
| `run_elk_action_worker` | Polls alerts from the ELK Action Index. |

> If you do not need a feature, you do not need its Worker. For example, frontend list-page work usually only needs the Django API.

## 8. Start frontend

Enter `frontend`, install dependencies, and start Vite:

```bash
cd /path/to/agentic-soc-platform/frontend
pnpm install
pnpm dev
```

Default URL:

```text
http://localhost:5173
```

Default Vite proxy:

```text
http://localhost:5173/api/*  ->  http://localhost:8000/api/*
```

To debug MCP from the frontend, add a more specific `/api/mcp` proxy before `/api` in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api/mcp': { target: 'http://localhost:8002', changeOrigin: true },
    '/api': { target: 'http://localhost:8000', changeOrigin: true },
  },
}
```

> Frontend changes do not need `npm build` unless build validation is explicitly requested.

## 9. Frontend-backend request flow

Development:

```text
Browser (localhost:5173)
  -> Vite proxy
    -> /api/mcp  -> ASGI (localhost:8002)  [optional]
    -> /api/*    -> WSGI / Django (localhost:8000)
```

Production:

```text
Browser (443)
  -> Nginx
    -> /api/mcp  -> ASGI (asp-asgi:8001)
    -> /api/*    -> WSGI / Django (asp-web:8000)
    -> /*        -> Frontend static files
```

## 10. Custom directory

During source development, `backend/custom/` mirrors the `custom/` directory in the Compose release package:

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

- `backend/custom/modules/`: Custom Modules.
- `backend/custom/playbooks/`: Custom Playbooks.
- `backend/custom/data/siem/`: Custom SIEM YAML.
- `backend/custom/data/playbooks/`: Custom Playbook prompts.
- `backend/custom/requirements.txt`: Extra Python packages required by custom code.

To test custom dependencies, install them into a local custom package directory and add it to `PYTHONPATH`:

```bash
mkdir -p .custom-packages
uv pip install --python .venv/bin/python --target .custom-packages -r custom/requirements.txt
export PYTHONPATH="$(pwd)/.custom-packages:$(pwd)/custom"
```

> After changing scripts or YAML files, use `Refresh / Validate` in the ASP frontend [Custom Console](../custom-console/).
