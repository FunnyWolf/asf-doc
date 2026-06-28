# 重启 & 运维

本页说明 Docker Compose 生产部署后的常用运维动作，包括状态检查、日志查看、服务重启、停止启动和定制内容变更。

## 1. 查看当前状态

```bash
docker compose ps
./scripts/doctor.sh
```

`doctor.sh` 会检查 PostgreSQL、Redis、Django、Custom definitions 和 RustFS/S3 bucket。生产环境中，升级、重启或修改定制内容后建议执行一次。

## 2. 查看日志

查看容器标准输出和标准错误：

```bash
docker compose logs -f asp-frontend
docker compose logs -f asp-web
docker compose logs -f asp-worker-elk-action
```

查看部署目录下的挂载日志：

```bash
tail -f logs/django.log
tail -f logs/asgi.log
tail -f logs/agentic-module-worker.log
tail -f logs/agentic-case-analysis-worker.log
tail -f logs/agentic-playbook-worker.log
tail -f logs/elk-action-worker.log
```

## 3. 重启服务

重启所有 ASP 服务：

```bash
docker compose restart
```

只重启 Web/API 入口：

```bash
docker compose restart asp-frontend asp-web asp-asgi
```

只重启后台 Worker：

```bash
docker compose restart asp-worker-module asp-worker-case-analysis asp-worker-playbook asp-worker-elk-action
```

> 修改 `.env`、`compose.yaml` 或端口映射后，使用 `docker compose up -d` 重新应用编排；只替换证书或需要进程重新读取配置时，使用 `docker compose restart <service>`。

## 4. 停止和启动

停止容器但保留数据卷：

```bash
docker compose stop
```

重新启动：

```bash
docker compose up -d
```

> 不要在生产环境执行 `docker compose down -v`，除非明确要删除 PostgreSQL、Redis 和 RustFS 的 Docker 数据卷。

## 5. 定制内容变更

- 只修改 Module、Playbook 或 SIEM YAML：在 [Custom Console](../../development/custom-console/) 执行 `Refresh / Validate`。
- 修改 `custom/requirements.txt`：重新安装依赖并重启相关 Worker。

```bash
docker compose run --rm asp-custom-deps --index-url https://pypi.org/simple
docker compose restart asp-worker-module asp-worker-playbook
```
