# Webhook

Webhook 用于接收外部系统直接 POST 的告警。它适合 SIEM 或告警平台可以访问 ASP API 的场景。

## 当前端点

| 来源 | API |
| --- | --- |
| [Splunk](splunk/) | `/api/webhook/splunk/` |
| [ELK / Kibana](elk/) | `/api/webhook/kibana/` |

Webhook 接收到告警后，后端会进入当前告警处理流程，生成或关联 Alert、Case、Artifact 等资源。

## 与 ELK Index Action 的区别

| 方式 | 说明 |
| --- | --- |
| Webhook | SIEM 直接 POST 到 ASP 的 Webhook 端点。 |
| [ELK Index Action](../elk-index-action/) | Kibana 先把 action 写入 Elasticsearch 索引，ASP 再由 worker 轮询读取。 |

## 使用建议

- 在 SIEM 侧配置告警 Action 指向对应端点。
- 保持来源告警中的唯一 ID、规则名、产品信息和原始日志字段完整。
- 用 Correlation UID 让同一事件的多个 Alert 聚合到同一 Case。
