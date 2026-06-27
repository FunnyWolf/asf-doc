# Environment Setup

This page is for source code development and local debugging. For production or standalone private deployment, please prioritize using the Docker Compose distribution package in [Deployment](../../quick-start/deployment/).

## Development Dependency Services

The development environment can use `development\docker` to start backend dependency services:

```powershell
Set-Location D:\Code\git\nodejs\sirp\development\docker
Copy-Item .env.example .env
docker compose up -d
```

This Compose will start PostgreSQL, Redis Stack, and RustFS:

| Service | Address | Description |
| --- | --- | --- |
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
| --- | --- |
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_HOST` / `POSTGRES_PORT` | PostgreSQL connection. |
| `REDIS_HOST` / `REDIS_PORT` / `REDIS_DB` / `REDIS_PASSWORD` | Redis connection. |
| `RUSTFS_ENDPOINT_URL` / `RUSTFS_ACCESS_KEY` / `RUSTFS_SECRET_KEY` / `RUSTFS_BUCKET` | RustFS / S3-compatible object storage. |
| `DJANGO_SECRET_KEY` | Can use test value for local development, must be set to random key in production. |
| `DJANGO_ALLOWED_HOSTS` | Allowed hostnames. |

Execute database migration and start development server:

```powershell
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py runserver
```

Backend API is mounted at `/api/` by default. After first database initialization, create admin account:

```powershell
.\.venv\Scripts\python.exe manage.py createsuperuser
```

## Custom Directory

During source code development, `backend\custom\` maintains the same directory structure as the `custom\` in the Compose release package:

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

If you need to test additional Python packages, you can install them to a local custom package directory and add it to `PYTHONPATH`:

```powershell
New-Item -ItemType Directory -Force .\.custom-packages
uv pip install --python .\.venv\Scripts\python.exe --target .\.custom-packages -r .\custom\requirements.txt
$env:ASP_CUSTOM_DIR = (Resolve-Path .\custom).Path
$env:PYTHONPATH = "$(Resolve-Path .\.custom-packages);$env:ASP_CUSTOM_DIR"
```

Refresh and validate custom definitions:

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from apps.agentic.services.custom_scripts import refresh_custom_definitions; import json; print(json.dumps(refresh_custom_definitions(), ensure_ascii=False, indent=2))"
```

## Background Workers

Start corresponding workers as needed during development:

```powershell
.\.venv\Scripts\python.exe manage.py run_agentic_module_worker
.\.venv\Scripts\python.exe manage.py run_agentic_case_analysis_worker
.\.venv\Scripts\python.exe manage.py run_agentic_playbook_worker
.\.venv\Scripts\python.exe manage.py run_elk_action_worker
```

| Worker | Function |
| --- | --- |
| `run_agentic_module_worker` | Consumes Redis Stream, runs Module to generate Case / Alert / Artifact. |
| `run_agentic_case_analysis_worker` | Executes Case AI analysis tasks. |
| `run_agentic_playbook_worker` | Executes user-triggered Playbooks. |
| `run_elk_action_worker` | Polls alerts from ELK Action Index. |

## MCP

MCP endpoint is mounted at `/api/mcp` on the ASGI application. If you want to test the ClaudeCode plugin in the development environment, you need to route `/api/mcp` to the ASGI service.

Backend regular API/Admin can use WSGI, MCP uses ASGI.

## Frontend

Enter the `frontend` directory to install dependencies and start development server:

```powershell
pnpm install
pnpm dev
```

Frontend API defaults to `/api`, development environment can forward to backend through Vite or reverse proxy.

## Documentation Site

This documentation is located at `asf-doc`:

```powershell
npm install
npm run docs:dev
```
