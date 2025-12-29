# Qdrant 插件

## 部署

Qdrant 作为平台向量数据库.

- **启动 Qdrant 服务:**
   ```bash
   cd agentic-soc-platform/Docker/Qdrant
   docker compose up -d
   ```

- **验证安装:**
  通过浏览器访问 Qdrant Dashborad 管理界面检查服务是否正常.
    - **URL:** `http://192.168.241.128:6333/dashboard`
    - **默认凭据:** `qdrant-password-for-agentic-soc-platform`

## 配置方法

- 将PLUGINS/Qdrant/CONFIG.example.py重命名为CONFIG.py
- 根据代码注释填写配置项