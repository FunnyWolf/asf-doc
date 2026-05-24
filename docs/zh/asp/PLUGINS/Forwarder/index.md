# Forwarder 插件

这是一个独立的 FastAPI 服务, 用于监听来自不同来源 (如 Splunk, Kibana) 的 webhook, 并将它们转发到 Redis Stream。

## 依赖安装

Forwarder 可以使用 ASP 的 uv 环境.
如 Forwarder 由独立主机部署,您可以通过以下命令安装所需依赖:

```bash
pip install -r PLUGINS/Forwarder/requirements.txt
```

请确保运行之前正确配置了 [Redis 插件](../Redis/).

## 配置方法

- 将PLUGINS/Forwarder/CONFIG.example.py重命名为CONFIG.py
- 根据代码注释填写配置项

## 运行服务

您可以通过两种方式使用 `uvicorn` 运行此服务:

### 1. 使用命令行参数 (适用于开发/快速启动)

在项目根目录下, 执行以下命令:

```bash
uvicorn PLUGINS.Forwarder.main:app --host 0.0.0.0 --port 8001 --reload
```

或直接执行

```bash
python PLUGINS/Forwarder/main.py
```

### 2. 使用 `uvicorn.toml` 配置文件 (推荐用于后台/生产环境)

为了更精确地控制执行, 特别是在后台或生产环境中, 您可以使用此目录下的 `uvicorn.toml` 配置文件。

在项目根目录下, 执行以下命令:

```bash
uvicorn --config PLUGINS/Forwarder/uvicorn.toml
```

此目录中的 `uvicorn.toml` 文件预先配置了主机、端口、工作进程数和日志级别。
为了稳定的后台运行, 它被设置为 `reload = false`。

## API 端点

- `GET /`: 一个简单的健康检查端点。
- `POST /api/v1/webhook/splunk`: 接收 Splunk 告警 webhook。
- `POST /api/v1/webhook/kibana`: 接收 Kibana (Elasticsearch) 告警 webhook。