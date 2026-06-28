# 部署

ASP 后端是 Django，前端是 Vite + Ant Design。单机私有化部署推荐使用 Docker Compose 分发包。

## Docker Compose 单机部署

发布包命名为 `asp-compose-<version>.tar.gz`，解压后包含：

```text
compose.yaml
.env.example
scripts/
custom/
```

首次部署：

```bash
./scripts/init.sh --index-url https://pypi.org/simple
docker compose exec asp-web python manage.py createsuperuser
```

如果 `.env` 不存在，`init.sh` 会从 `.env.example` 创建 `.env`，并写入随机的 `DJANGO_SECRET_KEY`、PostgreSQL 密码、Redis 密码和 RustFS/S3 Secret。用户可以在初始化后继续编辑 `.env`，改成自己的密码、域名或端口。

如果 `.env` 中仍存在 `change-me-*` 占位密码，初始化会中止，避免使用默认密码启动服务。

`custom/requirements.txt` 不为空时，`init.sh` 会先执行 `asp-custom-deps`；`init.sh` 后面的参数会原样传给 `uv pip install`。如果没有额外 Python 依赖，直接执行 `./scripts/init.sh` 即可。需要代理时使用标准环境变量：

```bash
HTTP_PROXY=http://proxy.example:8080 HTTPS_PROXY=http://proxy.example:8080 \
./scripts/init.sh --index-url https://pypi.org/simple
```

Compose 默认包含前端、Django HTTP API、ASGI/MCP、Module Worker、Case Analysis Worker、Playbook Worker、ELK Action Worker、PostgreSQL、Redis Stack 和 RustFS。

## HTTPS 与证书

Compose 部署默认只监听 HTTPS。宿主机绑定地址和端口由 `.env` 中的 `ASP_BIND`、`ASP_HTTPS_PORT` 控制，默认是：

```text
ASP_BIND=0.0.0.0
ASP_HTTPS_PORT=443
```

如果 443 已被占用，可以只修改 `ASP_HTTPS_PORT`。

前端容器固定读取：

```text
certs/asp.crt
certs/asp.key
```

如果这两个文件不存在，`asp-frontend` 首次启动时会自动生成一套当前环境独有的自签名证书。证书名称使用 `.env` 中的 `ASP_PUBLIC_HOSTNAME`，也可以通过 `ASP_CERT_EXTRA_SAN` 增加额外域名或 IP：

```text
ASP_PUBLIC_HOSTNAME=asp.example.com
ASP_CERT_EXTRA_SAN=DNS:asp.internal,IP:10.0.0.10
```

自签名证书会触发浏览器安全提示，适合初始化或内网测试。正式环境建议替换为企业 CA 或公网 CA 签发的证书。替换证书后重启前端容器：

```bash
docker compose restart asp-frontend
```

## 管理界面端口

Redis Stack 和 RustFS 自带 Web 管理界面。为避免反向代理导致静态资源或 WebSocket 兼容问题，部署包按官方默认方式直接暴露 HTTP 管理端口：

| 服务 | 默认地址 | 说明 |
| --- | --- | --- |
| Redis Stack UI | `http://<server>:8001` | Redis 管理界面。 |
| RustFS Console | `http://<server>:9001` | RustFS Web 管理界面。 |

RustFS S3 API 默认不暴露到宿主机，只供 ASP 后端容器内部访问。

端口和绑定地址在 `.env` 中配置：

```text
ASP_MANAGEMENT_BIND=0.0.0.0
ASP_REDIS_UI_PORT=8001
ASP_RUSTFS_CONSOLE_PORT=9001
```

默认绑定 `0.0.0.0`，适合服务器部署。生产环境应结合防火墙或 VPN 控制管理界面的访问范围。

## 定制目录

部署包中的 `custom/` 用于放置用户定制内容：

| 路径 | 用途 |
| --- | --- |
| `custom/modules/*.py` | 自定义 Module。 |
| `custom/playbooks/*.py` | 自定义 Playbook。 |
| `custom/data/modules/<module_slug>/raw_alert_*.json` | Module 开发调试样本。 |
| `custom/data/siem/*.yaml` | 自定义 SIEM YAML。 |
| `custom/data/playbooks/<playbook_slug>/*.md` | 自定义 Playbook Prompt。 |
| `custom/requirements.txt` | Module / Playbook 需要的额外 Python 包。 |

修改脚本或 YAML 后，可以在 [Custom Console](../../development/custom-console/) 对应 Tab 中执行 `Refresh / Validate`。如果变更了 Python 依赖或公共 helper module，需要重新执行 `asp-custom-deps` 并重启相关容器。

## 日志

后端进程日志会挂载到部署目录的 `logs/`：

```text
logs/django.log
logs/asgi.log
logs/agentic-module-worker.log
logs/agentic-case-analysis-worker.log
logs/agentic-playbook-worker.log
logs/elk-action-worker.log
```

容器标准输出和标准错误仍可通过 `docker compose logs` 查看。
