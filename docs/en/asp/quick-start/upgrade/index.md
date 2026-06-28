# Upgrade

For production upgrades, use the simple path first: **back up data, update image versions, run the upgrade script, and check status**. Do not reinitialize the deployment, and do not delete Docker volumes.

> Unless the release notes explicitly require replacing `compose.yaml` or `scripts/`, you usually only need to update image versions in `.env` and run `./scripts/upgrade.sh`.

## 1. Back up before upgrading

Before upgrading, complete one stopped full backup using [Backup & Restore](../backup-restore/).

## 2. Update image versions

Edit `.env` and change the backend and frontend image tags to the target version:

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:<version>
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:<version>
```

Use the target Release version for `<version>`, for example `0.4.1`.

## 3. Run the upgrade

```bash
./scripts/upgrade.sh
```

The script pulls images, runs database migrations, starts services, and runs `./scripts/doctor.sh`.

## 4. Check after upgrading

```bash
docker compose ps
./scripts/doctor.sh
```

If a service looks unhealthy, check its logs:

```bash
docker compose logs --tail=100 asp-web
docker compose logs --tail=100 asp-frontend
```

## 5. When package files must be replaced

Only replace package files when the release notes explicitly require Docker Compose or script updates. Keep the current `.env`, `custom/`, `certs/`, and Docker named volumes, and replace only:

- `compose.yaml`
- `scripts/`
- `.env.example`

After replacing them, return to step 2, update image versions in `.env`, and run the upgrade.

> In production, keep using the same `asp-compose/` directory. The default Compose project name comes from the directory name; changing directories can change Docker named volume names and make existing data appear missing.
