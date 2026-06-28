# Backup & Restore

This page provides one simple and reliable approach: **stopped full backup and restore**. Run both backup and restore from a deployment directory named `asp-compose`, so the Docker Compose project name and volume names stay unchanged.

> Do not run `docker compose down -v`. The `-v` flag deletes Docker named volumes for PostgreSQL, Redis, RustFS, and other persistent data.

## 1. Full backup

Run this in the `asp-compose/` directory:

```bash
BACKUP_DIR="$PWD/backups/asp-full-$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"

docker compose stop

tar -czf "$BACKUP_DIR/files.tar.gz" \
  --exclude='./backups' \
  .env .env.example compose.yaml scripts custom certs logs

docker run --rm \
  -v asp-compose_postgres-data:/volumes/postgres-data:ro \
  -v asp-compose_redis-data:/volumes/redis-data:ro \
  -v asp-compose_rustfs-data:/volumes/rustfs-data:ro \
  -v asp-compose_custom-python-packages:/volumes/custom-python-packages:ro \
  -v asp-compose_static-files:/volumes/static-files:ro \
  -v "$BACKUP_DIR:/backup" \
  alpine sh -lc 'cd /volumes && tar -czf /backup/volumes.tar.gz postgres-data redis-data rustfs-data custom-python-packages static-files'

docker compose up -d
./scripts/doctor.sh
```

The backup contains:

- `files.tar.gz`: `.env`, `compose.yaml`, `scripts/`, `custom/`, `certs/`, and the log directory.
- `volumes.tar.gz`: Docker named volumes for PostgreSQL, Redis, RustFS, custom Python packages, and static files.

## 2. Full restore

Before restoring, confirm:

- The restore directory name is still `asp-compose`.
- The backup directory contains `files.tar.gz` and `volumes.tar.gz`.
- If restoring to a new machine, Docker and Docker Compose are already installed.

Run this in the target `asp-compose/` directory:

```bash
BACKUP_DIR=/path/to/asp-full-backup

tar -xzf "$BACKUP_DIR/files.tar.gz" -C .

docker compose down --remove-orphans

docker run --rm \
  -v asp-compose_postgres-data:/volumes/postgres-data \
  -v asp-compose_redis-data:/volumes/redis-data \
  -v asp-compose_rustfs-data:/volumes/rustfs-data \
  -v asp-compose_custom-python-packages:/volumes/custom-python-packages \
  -v asp-compose_static-files:/volumes/static-files \
  -v "$BACKUP_DIR:/backup" \
  alpine sh -lc '
    for dir in postgres-data redis-data rustfs-data custom-python-packages static-files; do
      rm -rf "/volumes/$dir"/* "/volumes/$dir"/.[!.]* "/volumes/$dir"/..?*
    done
    tar -xzf /backup/volumes.tar.gz -C /volumes
  '

docker compose up -d
./scripts/doctor.sh
```

> If the restore directory is not named `asp-compose`, Docker Compose generates different default volume names, for example no longer `asp-compose_postgres-data`. Services will then not see the restored data.
