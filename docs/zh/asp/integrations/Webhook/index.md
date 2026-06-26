# Webhook

Webhook 用于接收外部系统发送的告警。

## 当前端点

| 来源 | API |
| --- | --- |
| Splunk | `/api/webhook/splunk/` |
| Kibana | `/api/webhook/kibana/` |

Webhook 接收到告警后，后端会进入当前告警处理流程，生成或关联 Alert、Case、Artifact 等资源。

## 使用建议

- 在 SIEM 侧配置告警 Action 指向对应端点。
- 保持来源告警中的唯一 ID、规则名、产品信息和原始日志字段完整。
- 用 Correlation UID 让同一事件的多个 Alert 聚合到同一 Case。
