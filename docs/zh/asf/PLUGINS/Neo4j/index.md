# Neo4j 插件

Neo4j 作为平台图数据库,用于 Mem0.

- **启动 Neo4j 服务:**
   ```bash
   cd agentic-soc-platform/Docker/Neo4j
   docker compose up -d
   ```


- **验证安装:**
  通过浏览器访问 Neo4j 管理界面检查服务是否正常.
    - **URL:** `http://192.168.241.128:7474`
    - **默认凭据:** Server : `bolt://192.168.241.128:7687` user : `neo4j` password : `neo4j-password-for-agentic-soc-platform`

## 配置方法

- 将PLUGINS/Neo4j/CONFIG.example.py重命名为CONFIG.py
- 根据代码注释填写配置项