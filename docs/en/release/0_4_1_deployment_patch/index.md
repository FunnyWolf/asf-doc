# 0.4.1 - Deployment Patch

0.4.1 is a deployment patch release after 0.4.0. It focuses on Docker Compose package fixes for Linux production environments, including initialization, certificate generation, health checks, and background worker configuration refresh.

## Fixes

- Fixed missing executable permissions for `scripts/*.sh` in the release package, avoiding `Permission denied` when running `./scripts/init.sh` on Linux.
- Fixed the frontend image certificate initialization script so it is executable and can generate `certs/asp.crt` and `certs/asp.key` on first startup.
- Fixed the frontend container health check by probing `https://127.0.0.1/` instead of `localhost`.
- Fixed long-running worker processes continuing to use stale runtime configuration. Workers now refresh runtime configuration before each iteration, and the ELK Action Worker reloads ELK settings on each poll.
- Fixed the case where ELK Action was enabled in the UI but the worker could still log `ELK Process Alert From Index is disabled; skipping poll`.

## Deployment Docs

- Added a production restart and operations page.
- Added a stopped full backup and restore page, explicitly requiring the deployment directory name to stay `asp-compose` so Docker named volume names do not change.
- Simplified upgrade guidance: back up, update image versions in `.env`, run `./scripts/upgrade.sh`, and check status.
- Added Chinese `README.zh.md` to the Docker Compose release package.

## Upgrade Notes

If you already deployed 0.4.0, back up first, then update image versions in `.env`:

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:0.4.1
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:0.4.1
```

Run the upgrade:

```bash
./scripts/upgrade.sh
```
