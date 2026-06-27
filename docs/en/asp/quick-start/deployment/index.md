# Deployment

ASP backend is Django, frontend is Vite + Ant Design. For standalone private deployment, Docker Compose distribution package is recommended.

## Docker Compose Standalone Deployment

The release package is named `asp-compose-<version>.tar.gz`, after extraction it contains:

```text
compose.yaml
.env.example
scripts/
custom/
```

First deployment:

```bash
./scripts/init.sh --index-url https://pypi.org/simple
docker compose exec asp-web python manage.py createsuperuser
```

If `.env` does not exist, `init.sh` will create `.env` from `.env.example` and write random `DJANGO_SECRET_KEY`, PostgreSQL password, Redis password, and RustFS/S3 Secret. Users can continue editing `.env` after initialization to change to their own passwords, domains, or ports.

If `change-me-*` placeholder passwords still exist in `.env`, initialization will abort to avoid starting services with default passwords.

When `custom/requirements.txt` is not empty, `init.sh` will first execute `asp-custom-deps`; parameters after `init.sh` will be passed to `uv pip install` as-is. If there are no additional Python dependencies, just execute `./scripts/init.sh`. When proxy is needed, use standard environment variables:

```bash
HTTP_PROXY=http://proxy.example:8080 HTTPS_PROXY=http://proxy.example:8080 \
./scripts/init.sh --index-url https://pypi.org/simple
```

Compose by default includes frontend, Django HTTP API, ASGI/MCP, Module Worker, Case Analysis Worker, Playbook Worker, ELK Action Worker, PostgreSQL, Redis Stack, and RustFS.

## HTTPS and Certificates

Compose deployment only listens to HTTPS by default. The host binding address and port are controlled by `ASP_BIND` and `ASP_HTTPS_PORT` in `.env`, default is:

```text
ASP_BIND=0.0.0.0
ASP_HTTPS_PORT=443
```

If 443 is already occupied, you can only modify `ASP_HTTPS_PORT`.

The frontend container fixed reads:

```text
certs/asp.crt
certs/asp.key
```

If these two files do not exist, `asp-frontend` will automatically generate a set of self-signed certificates unique to the current environment on first startup. The certificate name uses `ASP_PUBLIC_HOSTNAME` from `.env`, and you can also add additional domains or IPs through `ASP_CERT_EXTRA_SAN`:

```text
ASP_PUBLIC_HOSTNAME=asp.example.com
ASP_CERT_EXTRA_SAN=DNS:asp.internal,IP:10.0.0.10
```

Self-signed certificates will trigger browser security warnings, suitable for initialization or intranet testing. For production environments, it is recommended to replace with certificates issued by enterprise CA or public CA. After replacing certificates, restart the frontend container:

```bash
docker compose restart asp-frontend
```

## Management Interface Ports

Redis Stack and RustFS have their own Web management interfaces. To avoid static resource or WebSocket compatibility issues caused by reverse proxy, the deployment package directly exposes HTTP management ports in the official default way:

| Service | Default Address | Description |
|---------|-----------------|-------------|
| Redis Stack UI | `http://<server>:8001` | Redis management interface. |
| RustFS Console | `http://<server>:9001` | RustFS Web management interface. |

RustFS S3 API is not exposed to the host by default, only for internal access by ASP backend containers.

Ports and binding addresses are configured in `.env`:

```text
ASP_MANAGEMENT_BIND=0.0.0.0
ASP_REDIS_UI_PORT=8001
ASP_RUSTFS_CONSOLE_PORT=9001
```

Default binding `0.0.0.0`, suitable for server deployment. Production environment should combine firewall or VPN to control management interface access scope.

## Custom Directory

The `custom/` in the deployment package is used to place user customizations:

| Path | Purpose |
|------|---------|
| `custom/modules/*.py` | Custom Modules. |
| `custom/playbooks/*.py` | Custom Playbooks. |
| `custom/data/modules/<module_slug>/raw_alert_*.json` | Module development debugging samples. |
| `custom/data/siem/*.yaml` | Custom SIEM YAML. |
| `custom/data/playbooks/<playbook_slug>/*.md` | Custom Playbook Prompt. |
| `custom/requirements.txt` | Additional Python packages needed by Module / Playbook. |

After modifying scripts or YAML, you can execute `Refresh / Validate` in `System Settings` → `Runtime`. If Python dependencies or common helper modules are changed, you need to re-execute `asp-custom-deps` and restart related containers.

## Logs

Backend process logs will be mounted to the `logs/` directory:

```text
logs/django.log
logs/asgi.log
logs/agentic-module-worker.log
logs/agentic-case-analysis-worker.log
logs/agentic-playbook-worker.log
logs/elk-action-worker.log
```

Container standard output and standard error can still be viewed via `docker compose logs`.
