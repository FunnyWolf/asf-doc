# Splunk 插件

## 功能介绍

- Splunk SIEM 客户端插件,基于 `splunk-sdk` 实现.
- 提供结构化查询、关键词搜索、字段发现等功能.
- 配合 SIEM 插件的 YAML 索引配置使用.

## 配置方法

- 将 `PLUGINS/Splunk/CONFIG.example.py` 重命名为 `CONFIG.py`
- 根据代码注释填写配置项

```python
SPLUNK_HOST = "10.10.10.10"
SPLUNK_PORT = 8089
SPLUNK_USER = "admin"
SPLUNK_PASS = "your_password"

SPLUNK_HEC_URL = "http://10.10.10.10:8088/services/collector"
SPLUNK_TOKEN = "your_hec_token"
```

| 配置项            | 说明                      |
|----------------|-------------------------|
| SPLUNK_HOST    | Splunk 服务器地址            |
| SPLUNK_PORT    | Splunk 管理端口 (默认 8089)   |
| SPLUNK_USER    | 登录用户名                   |
| SPLUNK_PASS    | 登录密码                    |
| SPLUNK_HEC_URL | HTTP Event Collector 地址 |
| SPLUNK_TOKEN   | HEC Token               |

## 配合使用

- [SIEM 插件](../SIEM/) — 使用 YAML 索引配置定义 Splunk 索引的字段映射
- [Forwarder 插件](../Forwarder/) — 接收 Splunk 告警 Webhook 并转发到 Redis Stream
