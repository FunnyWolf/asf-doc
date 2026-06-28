# Environment Setup

This page is for source code development and local debugging. For production or standalone private deployment, please prioritize using the Docker Compose distribution package in [Deployment](../../quick-start/deployment/).

## Architecture Overview

The ASP backend consists of three types of processes:

| Process | Technology | Port | Responsibility |
|---------|------------|------|----------------|
| WSGI | gunicorn / runserver | 8000 | Django REST API, handles all `/api/` requests |
| ASGI | uvicorn | 8001 | MCP Server, handles `/api/mcp` requests |
| Workers | manage.py commands | — | Background tasks: Module consumption, Case analysis, Playbook execution, ELK polling |

Routing rules:

```text
/api/mcp  → ASGI (Starlette → FastMCP)
/api/*    → WSGI (Django REST Framework)
/admin/*  → WSGI (Django Admin)
```

The frontend accesses the backend through Vite proxy (development) or Nginx (production).

## Development Dependency Services

The development environment can use `development/docker` to start backend dependency services:

```powershell
Set-Location D:\Code\git\agentic-soc-platform\development\docker
Copy-Item .env.example .env
docker compose up -d
```

This Compose will start PostgreSQL, Redis Stack, and RustFS:

| Service | Address | Description |
|---------|---------|-------------|
| PostgreSQL | `localhost:5432` | Backend database. |
| Redis | `localhost:6379` | Cache and Redis Stream. |
| Redis Stack UI | `http://localhost:8001` | Redis web management interface. |
| RustFS S3 API | `http://localhost:9000` | S3-compatible interface used for attachments and avatars. |
| RustFS Console | `http://localhost:9001` | RustFS web management interface. |

Corresponding backend `.env` example:

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

## Backend

Enter the `backend` directory and use the project's virtual environment to run management commands.

Install dependencies:

```powershell
uv sync
```

Configure `.env`, at least confirm the following runtime dependencies:

| Configuration | Description |
|---------------|-------------|
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT` | PostgreSQL connection. |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_DB` / `REDIS_PASSWORD` | Redis connection. |
| `RUSTFS_ENDPOINT_URL` / `RUSTFS_ACCESS_KEY` / `RUSTFS_SECRET_KEY` / `RUSTFS_BUCKET` | RustFS / S3-compatible object storage. |
| `DJANGO_SECRET_KEY` | Can use test value for local development, must be set to random key in production. |
| `DJANGO_ALLOWED_HOSTS` | Allowed hostnames. |

Execute database migration and create admin account:

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## Start WSGI (API Service)

```powershell
# Option 1: Django development server (simple, auto-reload)
.\.venv\Scripts\python.exe manage.py runserver

# Option 2: Gunicorn (closer to production, requires gunicorn)
.\.venv\Scripts\gunicorn asp.wsgi:application --bind 0.0.0.0:8000 --reload
```

After startup, the API is accessible at `http://localhost:8000/api/`.

## Start ASGI (MCP Service)

```powershell
.\.venv\Scripts\uvicorn asp.asgi:application --host 0.0.0.0 --port 8001 --reload
```

The ASGI application uses Starlette routing:

```text
/api/mcp  → FastMCP Server (MCP protocol endpoint)
/         → Django application (fallback route)
```

After startup, the MCP endpoint is accessible at `http://localhost:8001/api/mcp`.

Verify ASGI is running:

```powershell
curl http://localhost:8001/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

## Start Workers

Start corresponding workers as needed during development:

```powershell
.\.venv\Scripts\python.exe manage.py run_agentic_module_worker
.\.venv\Scripts\python.exe manage.py run_agentic_case_analysis_worker
.\.venv\Scripts\python.exe manage.py run_agentic_playbook_worker
.\.venv\Scripts\python.exe manage.py run_elk_action_worker
```

| Worker | Function |
|--------|----------|
| `run_agentic_module_worker` | Consumes Redis Stream, runs Module to generate Case / Alert / Artifact. |
| `run_agentic_case_analysis_worker` | Executes Case AI analysis tasks. |
| `run_agentic_playbook_worker` | Executes user-triggered Playbooks. |
| `run_elk_action_worker` | Polls alerts from ELK Action Index. |

## Frontend

Enter the `frontend` directory to install dependencies and start development server:

```powershell
pnpm install
pnpm dev
```

The frontend accesses backend API through Vite proxy by default:

```text
http://localhost:5173/api/*  →  http://localhost:8000/api/*
```

If you need to test MCP in the development environment, the frontend needs to proxy `/api/mcp` to the ASGI service. Add the following to `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api/mcp': { target: 'http://localhost:8001', changeOrigin: true },
    '/api': { target: 'http://localhost:8000', changeOrigin: true },
  },
}
```

## Frontend-Backend Integration

### Development Environment

```text
Browser (localhost:5173)
  → Vite Proxy
    → /api/mcp  → ASGI (localhost:8001)  [if proxy configured]
    → /api/*    → WSGI (localhost:8000)
```

### Production Environment

```text
Browser (443)
  → Nginx
    → /api/mcp  → ASGI (asp-asgi:8001)
    → /api/*    → WSGI (asp-web:8000)
    → /*        → Static files (frontend)
```

In production, Nginx handles routing: MCP requests go to ASGI, other API requests go to WSGI.

## Custom Directory

During source code development, `backend/custom/` maintains the same directory structure as the `custom/` in the Compose release package:

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

If you need to test additional Python packages, install them to a local custom package directory and add it to `PYTHONPATH`:

```powershell
New-Item -ItemType Directory -Force .\.custom-packages
uv pip install --python .\.venv\Scripts\python.exe --target .\.custom-packages -r .\custom\requirements.txt
$env:PYTHONPATH = "$(Resolve-Path .\.custom-packages);$(Resolve-Path .\custom)"
```

Refresh and validate custom definitions:

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from apps.agentic.services.custom_scripts import refresh_custom_definitions; import json; print(json.dumps(refresh_custom_definitions(), ensure_ascii=False, indent=2))"
```
