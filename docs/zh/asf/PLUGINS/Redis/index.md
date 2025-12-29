# Redis 插件

## 部署

Redis Stack 为平台提供高速的消息队列和缓存能力.

- **启动 Redis Stack 服务:**
   ```bash
   cd agentic-soc-platform/Docker/RedisStack
   docker compose up -d
   ```

- **验证安装:**
  通过浏览器访问 Redis Insight 管理界面检查服务是否正常.
    - **URL:** `http://192.168.241.128:8001`
    - **默认凭据:** 用户名 `default` / 密码 `redis-stack-password-for-agentic-soc-platform`

## 配置方法

- 将PLUGINS/Redis/CONFIG.example.py重命名为CONFIG.py
- 根据代码注释填写配置项
