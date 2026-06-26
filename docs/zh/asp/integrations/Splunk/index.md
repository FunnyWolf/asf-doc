# Splunk 插件

Splunk SIEM 客户端，基于 `splunk-sdk` 实现，为 SIEM 插件提供 Splunk 后端查询能力。

## 配置方法

1. 将 `PLUGINS/Splunk/CONFIG.example.py` 重命名为 `CONFIG.py`
2. 填写配置项：

| 配置项              | 说明                                         |
|------------------|--------------------------------------------|
| `SPLUNK_HOST`    | Splunk 服务器地址                               |
| `SPLUNK_PORT`    | 管理端口，默认 `8089`                             |
| `SPLUNK_USER`    | 登录用户名                                      |
| `SPLUNK_PASS`    | 登录密码                                       |
| `SPLUNK_HEC_URL` | HTTP Event Collector 地址，仅 Mock 插件生成测试数据时需要 |
| `SPLUNK_TOKEN`   | HEC Token，仅 Mock 插件生成测试数据时需要               |

不使用 [Mock 插件](../Mock/index.md) 生成测试数据时，`SPLUNK_HEC_URL` 和 `SPLUNK_TOKEN` 可留空。

## 发送告警到 Redis Stream (webhook action)

- 配置 [Forwarder 插件](../Webhook/index.md)

- 编写 SPL 后保存为 Alert，具体配置参考下图。

![img.png](img.png)

> Cron Expression/Time Range 部分表示每 5 分钟执行一次，搜索前 5 分钟数据（可根据需求自行调整）。

> Trigger 选择 `For each result` 确保每个结果都独立发送一次 Webhook。

> Webhook 地址填写为 http://192.168.163.128:7000/api/v1/webhook/splunk，根据实际情况替换 ip 和端口。

- Alert 触发后 [Forwarder 插件](../Webhook/index.md) 会打印相关日志。

![img_2.png](img_2.png)

- Redis Insight 可以看到发送到 Stream 的告警信息。

![img_1.png](img_1.png)


