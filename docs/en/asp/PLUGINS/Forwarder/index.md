# Forwarder Plugin

This is an independent FastAPI service used to listen for webhooks from different sources (such as Splunk, Kibana) and forward them to a Redis Stream.

## Dependency Installation

The Forwarder can use ASP's uv environment.
If the Forwarder is deployed on a standalone host, you can install the required dependencies using the following command:

```bash
pip install -r PLUGINS/Forwarder/requirements.txt
```

Please ensure that the [Redis plugin](../Redis/) is correctly configured before running.

## Configuration Method

- Rename PLUGINS/Forwarder/CONFIG.example.py to CONFIG.py
- Fill in the configuration items according to the code comments

## Running the Service

You can run this service using `uvicorn` in two ways:

### 1. Using Command Line Parameters (for development/quick start)

In the project root directory, execute the following command:

```bash
uvicorn PLUGINS.Forwarder.main:app --host 0.0.0.0 --port 8001 --reload
```

Or execute directly:

```bash
python PLUGINS/Forwarder/main.py
```

### 2. Using `uvicorn.toml` Configuration File (recommended for background/production environments)

For more precise control over execution, especially in background or production environments, you can use the `uvicorn.toml` configuration file in this directory.

In the project root directory, execute the following command:

```bash
uvicorn --config PLUGINS/Forwarder/uvicorn.toml
```

The `uvicorn.toml` file in this directory is pre-configured with host, port, number of worker processes, and log level.
For stable background operation, it is set to `reload = false`.

## API Endpoints

- `GET /`: A simple health check endpoint.
- `POST /api/v1/webhook/splunk`: Receives Splunk alert webhooks.
- `POST /api/v1/webhook/kibana`: Receives Kibana (Elasticsearch) alert webhooks.
- `POST /api/v1/webhook/nocolymail`: Receives NocolyMail webhooks.
