# Restart & Operations

This page covers common production operations for Docker Compose deployments, including status checks, logs, restarts, stop/start commands, and custom content changes.

## 1. Check current status

```bash
docker compose ps
./scripts/doctor.sh
```

`doctor.sh` checks PostgreSQL, Redis, Django, Custom definitions, and the RustFS/S3 bucket. In production, run it after upgrades, restarts, or custom definition changes.

## 2. View logs

View container stdout and stderr:

```bash
docker compose logs -f asp-frontend
docker compose logs -f asp-web
docker compose logs -f asp-worker-elk-action
```

View mounted process logs under the deployment directory:

```bash
tail -f logs/django.log
tail -f logs/asgi.log
tail -f logs/agentic-module-worker.log
tail -f logs/agentic-case-analysis-worker.log
tail -f logs/agentic-playbook-worker.log
tail -f logs/elk-action-worker.log
```

## 3. Restart services

Restart all ASP services:

```bash
docker compose restart
```

Restart only the Web/API entrypoints:

```bash
docker compose restart asp-frontend asp-web asp-asgi
```

Restart only background workers:

```bash
docker compose restart asp-worker-module asp-worker-case-analysis asp-worker-playbook asp-worker-elk-action
```

> After changing `.env`, `compose.yaml`, or port mappings, run `docker compose up -d` to apply the Compose definition. When only replacing certificates or asking processes to reload configuration, use `docker compose restart <service>`.

## 4. Stop and start

Stop containers while keeping data volumes:

```bash
docker compose stop
```

Start again:

```bash
docker compose up -d
```

> Do not run `docker compose down -v` in production unless you explicitly want to delete PostgreSQL, Redis, and RustFS Docker volumes.

## 5. Custom content changes

- If only Module, Playbook, or SIEM YAML files changed, run `Refresh / Validate` in [Custom Console](../../development/custom-console/).
- If `custom/requirements.txt` changed, reinstall dependencies and restart related workers.

```bash
docker compose run --rm asp-custom-deps --index-url https://pypi.org/simple
docker compose restart asp-worker-module asp-worker-playbook
```
