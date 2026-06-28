# 告警接入

告警接入负责把 SIEM 或检测平台中的告警结果写入 ASP 的 Redis Stream。它是 Module 的上游，自己不直接创建 Case / Alert / Artifact。

```text
SIEM Rule / Alert
  -> Webhook 或 ELK Index Action
  -> Redis Stream
  -> Module
  -> Case / Alert / Artifact
```

> Stream 名称是告警接入和 Module 之间最关键的约定。Splunk 的 `search_name`、Kibana 的 `rule.name` 或 ELK Index Action 中的 `rule.name` 最终都应与目标 Module 的 `STREAM_NAME` 对齐。

## 接入方式

| 方式 | 适用场景 | 后续处理 |
| --- | --- | --- |
| [Splunk Webhook](splunk-webhook/) | Splunk Alert 可以直接访问 ASP API。 | Webhook 把 `result` 写入以 `search_name` 命名的 Redis Stream。 |
| [Kibana Webhook](kibana-webhook/) | Kibana Rule 可以直接访问 ASP API。 | Webhook 把 `context.hits` 写入以 `rule.name` 命名的 Redis Stream。 |
| [ELK Index Action](elk-index-action/) | Kibana 不能直接 POST 到 ASP，或希望先把 action 落到 Elasticsearch。 | Worker 轮询 Action Index，再写入以 `rule.name` 命名的 Redis Stream。 |

## 和其他定制开发页面的关系

- [Mock 数据](../mock-data/)：可以生成 SIEM 测试日志，作为告警规则输入。
- [SIEM YAML](../siem-yaml/)：描述日志索引和字段，帮助编写查询和让 Agent 理解日志。
- [Module 开发](../module-examples/)：消费 Redis Stream raw alert，并创建 ASP 资源。
- [Custom Console](../custom-console/)：检查 Module 是否加载、Stream 是否存在、消息是否进入 Stream。
- [Custom Examples](../custom-examples/)：通过示例展示 Mock SIEM、查询规则、Module 和 Playbook 如何配合。

## 选择建议

- SIEM 能直接访问 ASP：优先使用 Webhook。
- Kibana 使用社区版或网络上不能直接访问 ASP：使用 ELK Index Action。
- 想本地验证完整链路：先用 [Mock 数据](../mock-data/) 生成 SIEM 日志，再配置告警接入和 Module。
