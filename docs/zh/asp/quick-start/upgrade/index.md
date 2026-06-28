# 升级

本页说明 Docker Compose 生产部署的升级流程。升级时要保留现有 `.env`、`custom/`、`certs/` 和 Docker named volumes，只替换发布包中的编排文件、脚本和镜像版本。

## 1. 升级前备份

升级前至少备份 `.env`、`custom/`、`certs/` 和 PostgreSQL 数据：

```bash
mkdir -p backups
set -a
. ./.env
set +a

tar -czf "backups/asp-config-$(date +%Y%m%d%H%M%S).tar.gz" .env custom certs
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "backups/postgres-$(date +%Y%m%d%H%M%S).sql"
```

> RustFS、Redis 和 PostgreSQL 都使用 Docker named volumes。生产环境如果依赖 Redis Stream 中的未处理消息，或 RustFS 中已有附件文件，应结合宿主机快照、云盘快照或 Docker volume 备份策略一起保护这些数据。

## 2. 下载并准备新发布包

```bash
cd ..
rm -rf /tmp/asp-compose
curl -fL -O https://github.com/FunnyWolf/agentic-soc-platform/releases/download/v0.4.0/asp-compose-0.4.0.tar.gz
tar -xzf asp-compose-0.4.0.tar.gz -C /tmp
```

把新发布包中的编排文件和脚本同步到当前部署目录，保留现有 `.env`、`custom/`、`certs/` 和 Docker named volumes：

```bash
cp /tmp/asp-compose/compose.yaml ./asp-compose/compose.yaml
rm -rf ./asp-compose/scripts
cp -a /tmp/asp-compose/scripts ./asp-compose/
cp /tmp/asp-compose/.env.example ./asp-compose/.env.example
cd asp-compose
```

> 默认 Compose project name 来自目录名。生产升级时建议继续使用同一个 `asp-compose/` 目录，避免 Docker named volumes 名称变化导致服务看不到原有数据。

## 3. 更新镜像版本

升级包的 `.env.example` 会包含新版本镜像。将现有 `.env` 中的镜像地址更新到目标版本：

```bash
grep '^ASP_.*_IMAGE=' .env.example
grep '^ASP_.*_IMAGE=' .env
```

然后编辑 `.env`：

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:<version>
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:<version>
```

## 4. 执行升级

```bash
./scripts/upgrade.sh
```

`upgrade.sh` 会执行：

```text
docker compose pull
docker compose run --rm asp-migrate
docker compose up -d
./scripts/doctor.sh
```

## 5. 升级后检查

```bash
docker compose ps
./scripts/doctor.sh
docker compose logs --tail=100 asp-web
docker compose logs --tail=100 asp-frontend
```

如果升级后修改了 `.env` 中的端口、域名或管理界面绑定地址，请确认防火墙、安全组和反向代理配置也同步更新。
