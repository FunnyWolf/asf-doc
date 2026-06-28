# Deployment

ASP backend is Django, and the frontend is Vite + Ant Design. For single-host private deployment, use the Docker Compose release package.

> The Docker Compose package is intended for single-host deployment, internal testing, and small production environments. It contains deployment templates, initialization scripts, and customization directories. Backend and frontend images are pulled from GHCR.

## 1. Download the package

- GitHub Releases: [https://github.com/FunnyWolf/agentic-soc-platform/releases](https://github.com/FunnyWolf/agentic-soc-platform/releases)
- Current release package: `asp-compose-0.4.0.tar.gz`

```bash
curl -fL -O https://github.com/FunnyWolf/agentic-soc-platform/releases/download/v0.4.0/asp-compose-0.4.0.tar.gz
tar -xzf asp-compose-0.4.0.tar.gz
cd asp-compose
```

> After each release, this version number and download URL should be updated to the current recommended version. For older versions, choose the matching asset from GitHub Releases.

## 2. Package contents

After extraction, the package creates the `asp-compose/` directory. It mainly contains:

```text
compose.yaml
.env.example
scripts/
custom/
logs/
certs/
```

- `compose.yaml`: Docker Compose definition.
- `.env.example`: Default configuration template. It is copied to `.env` during initialization.
- `scripts/`: Initialization, upgrade, diagnostics, and custom dependency scripts.
- `custom/`: User-defined Modules, Playbooks, SIEM YAML files, and dependencies.
- `logs/`: Mounted backend process logs.
- `certs/`: HTTPS certificate directory.

## 3. First initialization

If custom Python dependencies need to be installed, pass `uv pip install` arguments to the initialization script:

```bash
./scripts/init.sh --index-url https://pypi.org/simple
docker compose exec asp-web python manage.py createsuperuser
```

If there are no extra Python dependencies, run:

```bash
./scripts/init.sh
docker compose exec asp-web python manage.py createsuperuser
```

> If `.env` does not exist, `init.sh` creates it from `.env.example` and writes random values for `DJANGO_SECRET_KEY`, PostgreSQL password, Redis password, and RustFS/S3 Secret. After initialization, you can continue editing `.env` to use your own passwords, domain names, or ports.

> If `change-me-*` placeholder passwords still exist in `.env`, initialization aborts to avoid starting services with default passwords.

Use standard proxy variables when needed:

```bash
HTTP_PROXY=http://proxy.example:8080 HTTPS_PROXY=http://proxy.example:8080 \
./scripts/init.sh --index-url https://pypi.org/simple
```

## 4. Default services

Compose includes:

- `asp-frontend`: Frontend HTTPS entrypoint.
- `asp-web`: Django HTTP API.
- `asp-asgi`: ASGI / MCP service.
- `asp-module-worker`: Module Worker.
- `asp-case-analysis-worker`: Case Analysis Worker.
- `asp-playbook-worker`: Playbook Worker.
- `asp-elk-action-worker`: ELK Action Worker.
- `postgres`: PostgreSQL.
- `redis-stack`: Redis Stack.
- `rustfs`: RustFS / S3-compatible object storage.

## 5. HTTPS and certificates

> Compose deployment listens on HTTPS only by default. The host bind address and port are controlled by `ASP_BIND` and `ASP_HTTPS_PORT` in `.env`.

Default values:

```text
ASP_BIND=0.0.0.0
ASP_HTTPS_PORT=443
```

- If 443 is already in use, only change `ASP_HTTPS_PORT`.
- The frontend container always reads `certs/asp.crt` and `certs/asp.key`.
- If the certificate files do not exist, `asp-frontend` automatically generates a self-signed certificate on first startup.

The certificate name uses `ASP_PUBLIC_HOSTNAME` from `.env`. Add extra domains or IPs with `ASP_CERT_EXTRA_SAN`:

```text
ASP_PUBLIC_HOSTNAME=asp.example.com
ASP_CERT_EXTRA_SAN=DNS:asp.internal,IP:10.0.0.10
```

> Self-signed certificates trigger browser security warnings and are best suited for initialization or internal testing. For production, replace them with certificates issued by an enterprise CA or public CA.

After replacing certificates, restart the frontend container:

```bash
docker compose restart asp-frontend
```

## 6. Management UI ports

> Redis Stack and RustFS provide their own web management UIs. To avoid reverse-proxy issues with static assets or WebSockets, the package exposes their official HTTP management ports directly.

| Service | Default Address | Description |
| --- | --- | --- |
| Redis Stack UI | `http://<server>:8001` | Redis management UI. |
| RustFS Console | `http://<server>:9001` | RustFS web console. |

RustFS S3 API is not exposed to the host by default. It is only used internally by ASP backend containers.

Configure ports and bind addresses in `.env`:

```text
ASP_MANAGEMENT_BIND=0.0.0.0
ASP_REDIS_UI_PORT=8001
ASP_RUSTFS_CONSOLE_PORT=9001
```

> The default bind address is `0.0.0.0`, which is suitable for server deployment. In production, use firewall or VPN controls to restrict access to management UIs.

## 7. Custom directory

The package uses `custom/` for user customizations:

| Path | Purpose |
| --- | --- |
| `custom/modules/*.py` | Custom Modules. |
| `custom/playbooks/*.py` | Custom Playbooks. |
| `custom/data/modules/<module_slug>/raw_alert_*.json` | Module development samples. |
| `custom/data/siem/*.yaml` | Custom SIEM YAML files. |
| `custom/data/playbooks/<playbook_slug>/*.md` | Custom Playbook prompts. |
| `custom/requirements.txt` | Extra Python packages required by Modules / Playbooks. |

- After changing scripts or YAML files, use `Refresh / Validate` in the corresponding [Custom Console](../../development/custom-console/) tab.
- After changing Python dependencies or shared helper modules, rerun `asp-custom-deps` and restart related containers.

## 8. Logs

Backend process logs are mounted to `logs/`:

```text
logs/django.log
logs/asgi.log
logs/agentic-module-worker.log
logs/agentic-case-analysis-worker.log
logs/agentic-playbook-worker.log
logs/elk-action-worker.log
```

Container stdout and stderr are still available through `docker compose logs`.
