# Redis 插件

Redis Stack 为平台提供消息队列（Stream）能力。

## 部署

```bash
cd agentic-soc-platform/Docker/RedisStack
docker compose up -d
```

通过 Redis Insight 验证：`http://192.168.241.128:8001`，默认凭据 `default`/`redis-stack-password-for-agentic-soc-platform`。

## 配置方法

1. 将 `PLUGINS/Redis/CONFIG.example.py` 重命名为 `CONFIG.py`
2. 修改配置项：

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `REDIS_URL` | `redis://:密码@地址:6379/` | Redis 连接地址 |
| `REDIS_STREAM_MAX_LENGTH` | `10000` | Stream 最大长度，超出后自动删除最旧消息 |
| `REDIS_MAX_CONNECTIONS` | `10` | 连接池大小，建议为模块数量的 2 倍 |

