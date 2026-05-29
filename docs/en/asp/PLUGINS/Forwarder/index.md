# Forwarder Plugin

This is a standalone FastAPI service that listens for webhooks from different sources (such as Splunk, Kibana) and forwards them to Redis Stream.

## Dependency Installation

The Forwarder can use ASP's uv environment. It can also be deployed on a standalone host. You can install the required dependencies using the following command:

```bash
pip install -r PLUGINS/Forwarder/requirements.txt
```

- Configure the [Redis Plugin](../Redis/index.md)

> index_action.py needs to read configuration items from the Redis plugin's CONFIG.py; ensure they are correctly configured

## Running the Service

- Switch to the project directory and load the venv environment

```bash
cd ~/agentic-soc-platform
source .venv/bin/activate
```

- Start the forwarding service:

```bash
uvicorn PLUGINS.Forwarder.main:app --host 0.0.0.0 --port 7000
```

## API Endpoints

- `GET /`: A simple health check endpoint.
- `POST /api/v1/webhook/splunk`: Receives Splunk alert webhooks.
- `POST /api/v1/webhook/kibana`: Receives Kibana (ELK) alert webhooks.
