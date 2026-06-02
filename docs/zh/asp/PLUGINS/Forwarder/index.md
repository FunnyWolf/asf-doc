# Forwarder 插件

这是一个独立的 FastAPI 服务，用于监听来自不同来源（如 Splunk、Kibana）的 webhook，并将它们转发到 Redis Stream。

## 依赖安装

Forwarder 可以使用 ASP 的 uv 环境，也可以独立主机部署，您可以通过以下命令安装所需依赖：

```bash
pip install -r PLUGINS/Forwarder/requirements.txt
```

- 配置 [Redis 插件](../Redis/index.md)

> index_action.py 需要读取 Redis 插件的 CONFIG.py 中的配置项，且确保正确配置。

## 运行服务

- 切换到项目目录，加载 venv 环境。

```bash
cd ~/agentic-soc-platform
source .venv/bin/activate
```

- 启动转发服务：

```bash
uvicorn PLUGINS.Forwarder.main:app --host 0.0.0.0 --port 7000
```

## API 端点

- `GET /`: 一个简单的健康检查端点。
- `POST /api/v1/webhook/splunk`: 接收 Splunk 告警 webhook。
- `POST /api/v1/webhook/kibana`：接收 Kibana（ELK）告警 webhook。