# Alert Ingestion

Alert Ingestion writes alerts from SIEM or detection platforms into ASP Redis Streams. It is the upstream layer of Modules and does not directly create Cases / Alerts / Artifacts.

```text
SIEM Rule / Alert
  -> Webhook or ELK Index Action
  -> Redis Stream
  -> Module
  -> Case / Alert / Artifact
```

> Stream naming is the key contract between Alert Ingestion and Modules. Splunk `search_name`, Kibana `rule.name`, or ELK Index Action `rule.name` should match the target Module `STREAM_NAME`.

## Ingestion methods

| Method | Scenario | Next step |
| --- | --- | --- |
| [Splunk Webhook](splunk-webhook/) | Splunk Alert can directly access ASP API. | Webhook writes `result` to the Redis Stream named by `search_name`. |
| [Kibana Webhook](kibana-webhook/) | Kibana Rule can directly access ASP API. | Webhook writes `context.hits` to the Redis Stream named by `rule.name`. |
| [ELK Index Action](elk-index-action/) | Kibana cannot directly POST to ASP, or you prefer writing actions to Elasticsearch first. | Worker polls the Action Index and writes to the Redis Stream named by `rule.name`. |

## Relationship to other custom development pages

- [Mock Data](../mock-data/): generates SIEM test logs for alert rules.
- [SIEM YAML](../siem-yaml/): describes log indexes and fields for queries and Agent understanding.
- [Module Development](../module-examples/): consumes Redis Stream raw alerts and creates ASP resources.
- [Custom Console](../custom-console/): checks whether Modules are loaded, Streams exist, and messages have entered Streams.
- [Custom Examples](../custom-examples/): shows how Mock SIEM, alert queries, Modules, and Playbooks work together.

## Recommendations

- If the SIEM can directly reach ASP, prefer Webhook.
- If Kibana uses Community Edition or cannot directly reach ASP, use ELK Index Action.
- To validate a full local flow, first generate SIEM logs with [Mock Data](../mock-data/), then configure alert ingestion and Module consumption.
