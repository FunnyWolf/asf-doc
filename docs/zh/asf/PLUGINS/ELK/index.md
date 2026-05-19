# ELK 插件

## 功能介绍

- Elasticsearch (ELK/Kibana) SIEM 客户端插件,基于 `elasticsearch-py` 实现.
- 提供结构化查询、关键词搜索、字段发现、聚合分析等功能.
- 配合 SIEM 插件的 YAML 索引配置使用.

## 配置方法

- 将 `PLUGINS/ELK/CONFIG.example.py` 重命名为 `CONFIG.py`
- 根据代码注释填写配置项

```python
ELK_HOST = "https://10.10.10.10:9200"
ELK_USER = "elastic"
ELK_PASS = "your_password"

ACTION_INDEX_NAME = "siem-alert"
POLL_INTERVAL_MINUTES = 1
```

| 配置项 | 说明 |
|-------|------|
| ELK_HOST | Elasticsearch 服务地址 |
| ELK_USER | 登录用户名 |
| ELK_PASS | 登录密码 |
| ACTION_INDEX_NAME | 告警索引名称 |
| POLL_INTERVAL_MINUTES | 轮询间隔(分钟) |

## 配合使用

- [SIEM 插件](../SIEM/) — 使用 YAML 索引配置定义 ELK 索引的字段映射
- [Forwarder 插件](../Forwarder/) — 接收 Kibana 告警 Webhook 并转发到 Redis Stream
