# Neo4j Plugin

Neo4j serves as the platform's graph database, used for Mem0.

- **Start Neo4j Service:**
   ```bash
   cd agentic-soc-platform/Docker/Neo4j
   docker compose up -d
   ```


- **Verify Installation:**
  Access the Neo4j administration interface through a browser to check if the service is running normally.
    - **URL:** `http://192.168.241.128:7474`
    - **Default Credentials:** Server : `bolt://192.168.241.128:7687` user : `neo4j` password : `neo4j-password-for-agentic-soc-platform`

## Configuration Method

- Rename PLUGINS/Neo4j/CONFIG.example.py to CONFIG.py
- Fill in the configuration items according to the code comments
