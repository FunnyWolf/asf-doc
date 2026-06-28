# 部署

ASP 后端是 Django，前端是 Vite + Ant Design。单机私有化部署推荐使用 Docker Compose 发布包。

> Docker Compose 发布包适合单机部署、内网测试和小规模生产环境。发布包只包含部署模板、初始化脚本和定制目录，后端/前端镜像会从 GHCR 拉取。

## 1. 下载发布包

- GitHub Releases 页面：[https://github.com/FunnyWolf/agentic-soc-platform/releases](https://github.com/FunnyWolf/agentic-soc-platform/releases)
- 当前版本发布包：`asp-compose-0.4.0.tar.gz`

```bash
curl -fL -O https://github.com/FunnyWolf/agentic-soc-platform/releases/download/v0.4.0/asp-compose-0.4.0.tar.gz
tar -xzf asp-compose-0.4.0.tar.gz
cd asp-compose
```

> 每次发布后，这里的版本号和下载链接会更新到当前推荐版本。如果需要历史版本，请到 GitHub Releases 选择对应版本的附件。

## 2. 发布包内容

解压后会生成 `asp-compose/` 目录，主要包含：

```text
compose.yaml
.env.example
scripts/
custom/
logs/
certs/
```

- `compose.yaml`：Docker Compose 编排文件。
- `.env.example`：默认配置模板，初始化时会复制为 `.env`。
- `scripts/`：初始化、升级、诊断和自定义依赖安装脚本。
- `custom/`：用户自定义 Module、Playbook、SIEM YAML 和依赖目录。
- `logs/`：后端进程日志挂载目录。
- `certs/`：HTTPS 证书目录。

## 3. 首次初始化

如果需要安装自定义 Python 依赖，可以在初始化时传入 `uv pip install` 参数：

```bash
./scripts/init.sh --index-url https://pypi.org/simple
docker compose exec asp-web python manage.py createsuperuser
```

如果没有额外 Python 依赖，直接执行：

```bash
./scripts/init.sh
docker compose exec asp-web python manage.py createsuperuser
```

> 如果 `.env` 不存在，`init.sh` 会从 `.env.example` 创建 `.env`，并写入随机的 `DJANGO_SECRET_KEY`、PostgreSQL 密码、Redis 密码和 RustFS/S3 Secret。初始化完成后，可以继续编辑 `.env`，改成自己的密码、域名或端口。

> 如果 `.env` 中仍存在 `change-me-*` 占位密码，初始化会中止，避免使用默认密码启动服务。

需要代理时使用标准环境变量：

```bash
HTTP_PROXY=http://proxy.example:8080 HTTPS_PROXY=http://proxy.example:8080 \
./scripts/init.sh --index-url https://pypi.org/simple
```

## 4. 默认服务

Compose 默认包含：

- `asp-frontend`：前端 HTTPS 入口。
- `asp-web`：Django HTTP API。
- `asp-asgi`：ASGI / MCP 服务。
- `asp-module-worker`：Module Worker。
- `asp-case-analysis-worker`：Case Analysis Worker。
- `asp-playbook-worker`：Playbook Worker。
- `asp-elk-action-worker`：ELK Action Worker。
- `postgres`：PostgreSQL。
- `redis-stack`：Redis Stack。
- `rustfs`：RustFS / S3-compatible object storage。

## 5. HTTPS 与证书

> Compose 部署默认只监听 HTTPS。宿主机绑定地址和端口由 `.env` 中的 `ASP_BIND`、`ASP_HTTPS_PORT` 控制。

默认值：

```text
ASP_BIND=0.0.0.0
ASP_HTTPS_PORT=443
```

- 如果 443 已被占用，只需要修改 `ASP_HTTPS_PORT`。
- 前端容器固定读取 `certs/asp.crt` 和 `certs/asp.key`。
- 如果证书文件不存在，`asp-frontend` 首次启动时会自动生成当前环境独有的自签名证书。

证书名称使用 `.env` 中的 `ASP_PUBLIC_HOSTNAME`，也可以通过 `ASP_CERT_EXTRA_SAN` 增加额外域名或 IP：

```text
ASP_PUBLIC_HOSTNAME=asp.example.com
ASP_CERT_EXTRA_SAN=DNS:asp.internal,IP:10.0.0.10
```

> 自签名证书会触发浏览器安全提示，适合初始化或内网测试。正式环境建议替换为企业 CA 或公网 CA 签发的证书。

替换证书后重启前端容器：

```bash
docker compose restart asp-frontend
```

## 6. 管理界面端口

> Redis Stack 和 RustFS 自带 Web 管理界面。为避免反向代理导致静态资源或 WebSocket 兼容问题，部署包按官方默认方式直接暴露 HTTP 管理端口。

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

> 默认绑定 `0.0.0.0`，适合服务器部署。生产环境应结合防火墙或 VPN 控制管理界面的访问范围。

## 7. 定制目录

部署包中的 `custom/` 用于放置用户定制内容：

| 路径 | 用途 |
| --- | --- |
| `custom/modules/*.py` | 自定义 Module。 |
| `custom/playbooks/*.py` | 自定义 Playbook。 |
| `custom/data/modules/<module_slug>/raw_alert_*.json` | Module 开发调试样本。 |
| `custom/data/siem/*.yaml` | 自定义 SIEM YAML。 |
| `custom/data/playbooks/<playbook_slug>/*.md` | 自定义 Playbook Prompt。 |
| `custom/requirements.txt` | Module / Playbook 需要的额外 Python 包。 |

- 修改脚本或 YAML 后，可以在 [Custom Console](../../development/custom-console/) 对应 Tab 中执行 `Refresh / Validate`。
- 如果变更了 Python 依赖或公共 helper module，需要重新执行 `asp-custom-deps` 并重启相关容器。

## 8. 日志

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
