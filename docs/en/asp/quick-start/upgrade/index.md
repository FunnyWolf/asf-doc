# Upgrade

This page covers the production upgrade flow for Docker Compose deployments. Keep the existing `.env`, `custom/`, `certs/`, and Docker named volumes; only replace release package Compose files, scripts, and image versions.

## 1. Back up before upgrading

Before upgrading, back up at least `.env`, `custom/`, `certs/`, and PostgreSQL data:

```bash
mkdir -p backups
set -a
. ./.env
set +a

tar -czf "backups/asp-config-$(date +%Y%m%d%H%M%S).tar.gz" .env custom certs
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "backups/postgres-$(date +%Y%m%d%H%M%S).sql"
```

> RustFS, Redis, and PostgreSQL use Docker named volumes. In production, if you rely on pending Redis Stream messages or RustFS attachment files, protect those volumes with host snapshots, cloud disk snapshots, or a Docker volume backup strategy.

## 2. Download and prepare the new package

```bash
cd ..
rm -rf /tmp/asp-compose
curl -fL -O https://github.com/FunnyWolf/agentic-soc-platform/releases/download/v0.4.0/asp-compose-0.4.0.tar.gz
tar -xzf asp-compose-0.4.0.tar.gz -C /tmp
```

Copy the new Compose files and scripts into the current deployment directory while keeping the existing `.env`, `custom/`, `certs/`, and Docker named volumes:

```bash
cp /tmp/asp-compose/compose.yaml ./asp-compose/compose.yaml
rm -rf ./asp-compose/scripts
cp -a /tmp/asp-compose/scripts ./asp-compose/
cp /tmp/asp-compose/.env.example ./asp-compose/.env.example
cd asp-compose
```

> The default Compose project name comes from the directory name. For production upgrades, keep using the same `asp-compose/` directory so Docker named volume names continue to point to the existing data.

## 3. Update image versions

The new package's `.env.example` contains the target image versions. Update the image values in your existing `.env`:

```bash
grep '^ASP_.*_IMAGE=' .env.example
grep '^ASP_.*_IMAGE=' .env
```

Then edit `.env`:

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:<version>
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:<version>
```

## 4. Run the upgrade

```bash
./scripts/upgrade.sh
```

`upgrade.sh` runs:

```text
docker compose pull
docker compose run --rm asp-migrate
docker compose up -d
./scripts/doctor.sh
```

## 5. Check after upgrading

```bash
docker compose ps
./scripts/doctor.sh
docker compose logs --tail=100 asp-web
docker compose logs --tail=100 asp-frontend
```

If you changed ports, domains, or management UI bind addresses in `.env`, also update firewall, security group, and reverse proxy configuration.
