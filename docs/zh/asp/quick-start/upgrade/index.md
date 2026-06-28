# 升级

生产环境升级优先走简单流程：**备份数据、更新镜像版本、执行升级脚本、检查状态**。不要重新初始化，也不要删除 Docker 数据卷。

> 除非发布说明明确要求替换 `compose.yaml` 或 `scripts/`，否则通常只需要更新 `.env` 中的镜像版本并执行 `./scripts/upgrade.sh`。

## 1. 升级前备份

升级前先按 [备份 & 恢复](../backup-restore/) 完成一次停机全量备份。

## 2. 更新镜像版本

编辑 `.env`，把后端和前端镜像标签改成目标版本：

```text
ASP_BACKEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-backend:<version>
ASP_FRONTEND_IMAGE=ghcr.io/funnywolf/agentic-soc-platform/asp-frontend:<version>
```

`<version>` 使用目标 Release 的版本号，例如 `0.4.1`。

## 3. 执行升级

```bash
./scripts/upgrade.sh
```

脚本会拉取镜像、执行数据库迁移、启动服务，并运行 `./scripts/doctor.sh`。

## 4. 升级后检查

```bash
docker compose ps
./scripts/doctor.sh
```

如果服务异常，再查看对应日志：

```bash
docker compose logs --tail=100 asp-web
docker compose logs --tail=100 asp-frontend
```

## 5. 需要替换发布包文件时

只有当发布说明明确要求更新 Docker Compose 编排或脚本时，才需要从新发布包中替换这些文件。保留当前目录中的 `.env`、`custom/`、`certs/` 和 Docker named volumes，只替换：

- `compose.yaml`
- `scripts/`
- `.env.example`

替换后回到第 2 步，更新 `.env` 中的镜像版本并执行升级。

> 生产环境建议继续使用同一个 `asp-compose/` 目录。默认 Compose project name 来自目录名，换目录可能导致 Docker named volumes 名称变化，从而看不到原有数据。
