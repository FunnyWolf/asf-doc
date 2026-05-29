# Redis Plugin

Redis Stack provides the message queue (Stream) capability for the platform.

## Deployment

```bash
cd agentic-soc-platform/Docker/RedisStack
docker compose up -d
```

Verify via Redis Insight: `http://192.168.241.128:8001`, default credentials `default` / `redis-stack-password-for-agentic-soc-platform`.

## Configuration

1. Rename `PLUGINS/Redis/CONFIG.example.py` to `CONFIG.py`
2. Modify the configuration items:

| Configuration Item       | Default Value | Description                                                  |
|--------------------------|---------------|--------------------------------------------------------------|
| `REDIS_URL`              | `redis://:password@address:6379/` | Redis connection address                     |
| `REDIS_STREAM_MAX_LENGTH`| `10000`       | Maximum Stream length; oldest messages are auto-deleted when exceeded |
| `REDIS_MAX_CONNECTIONS`  | `10`          | Connection pool size; recommended to be 2x the number of modules |
