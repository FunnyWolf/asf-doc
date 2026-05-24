# Redis Plugin

## Deployment

Redis Stack provides high-speed message queue and caching capabilities for the platform.

- **Start Redis Stack Service:**
   ```bash
   cd agentic-soc-platform/Docker/RedisStack
   docker compose up -d
   ```

- **Verify Installation:**
  Access the Redis Insight administration interface through a browser to check if the service is running normally.
    - **URL:** `http://192.168.241.128:8001`
    - **Default Credentials:** Username `default` / Password `redis-stack-password-for-agentic-soc-platform`

## Configuration Method

- Rename PLUGINS/Redis/CONFIG.example.py to CONFIG.py
- Fill in the configuration items according to the code comments