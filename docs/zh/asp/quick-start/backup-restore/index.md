# 备份 & 恢复

本页只提供一套简单可靠的方案：**停机全量备份和恢复**。备份和恢复都必须在目录名为 `asp-compose` 的部署目录中执行，避免 Docker Compose project name 变化导致 volume 名称变化。

> 不要执行 `docker compose down -v`。`-v` 会删除 PostgreSQL、Redis、RustFS 等 Docker named volumes。

## 1. 全量备份

在 `asp-compose/` 目录中执行：

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

备份结果包含：

- `files.tar.gz`：部署目录中的 `.env`、`compose.yaml`、`scripts/`、`custom/`、`certs/` 和日志目录。
- `volumes.tar.gz`：PostgreSQL、Redis、RustFS、custom Python packages 和 static files 的 Docker named volumes。

## 2. 全量恢复

恢复前确认：

- 恢复目录名仍然是 `asp-compose`。
- 当前目录中已经有 `files.tar.gz` 和 `volumes.tar.gz` 对应的备份文件。
- 如果恢复到新机器，先安装 Docker 和 Docker Compose。

在要恢复的 `asp-compose/` 目录中执行：

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

> 如果恢复目录不是 `asp-compose`，Docker Compose 默认生成的 volume 名称会变化，例如不再是 `asp-compose_postgres-data`。这会导致服务看不到恢复的数据。
