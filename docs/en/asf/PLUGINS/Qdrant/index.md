# Qdrant Plugin

## Deployment

Qdrant serves as the platform's vector database.

- **Start Qdrant Service:**
   ```bash
   cd agentic-soc-platform/Docker/Qdrant
   docker compose up -d
   ```

- **Verify Installation:**
  Access the Qdrant Dashboard administration interface through a browser to check if the service is running normally.
    - **URL:** `http://192.168.241.128:6333/dashboard`
    - **Default Credentials:** `qdrant-password-for-agentic-soc-platform`

## Configuration Method

- Rename PLUGINS/Qdrant/CONFIG.example.py to CONFIG.py
- Fill in the configuration items according to the code comments
