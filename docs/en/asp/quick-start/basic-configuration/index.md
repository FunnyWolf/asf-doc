# Basic Configuration

After initial deployment, it is recommended to complete configuration in the following order.

## 1. LLM Provider

Add at least one enabled [LLM Provider](../../settings/llm-provider/) in system settings.

Tags can be used to distinguish model capabilities such as `fast`, `powerful`, `tool_calling`, `structured_output`.

It is recommended to configure at least one Provider with the `structured_output` tag, otherwise AI investigation and knowledge extraction may not work.

## 2. SIEM

Configure Splunk or ELK in [SIEM](../../settings/siem/) for subsequent log search, Agent investigation, and ELK Index Action.

If Agent / MCP needs to query SIEM, you also need to maintain [SIEM YAML](../../development/siem-yaml/) index configuration.

## 3. Threat Intelligence

After enabling AlienVault OTX in [Threat Intelligence](../../settings/threat-intelligence/), the Threat Intelligence Enrichment Playbook can write IOC query results into Artifact's Enrichment.

## 4. LDAP

If enterprise identity source is needed, configure [LDAP](../../settings/ldap/) and confirm the connection is available through the test function.

## 5. Runtime

Configure [Runtime](../../settings/runtime/) based on team language and operation scale:

- Prompt Language: default `en`, Chinese teams can set it to `zh`.
- Stream Maxlen: default `10000`, controls the approximate maximum length retained when writing Webhook alerts to Redis Stream.

## 6. Webhook / ELK Index Action

Choose alert ingestion method:

- SIEM can directly access ASP: use [Webhook](../../development/alert-ingestion/).
- Kibana can only write to Elasticsearch index: use [ELK Index Action](../../development/alert-ingestion/elk-index-action/) and start `run_elk_action_worker`.

After ingestion, confirm that the corresponding [Module](../../development/module-examples/)'s `STREAM_NAME` matches the alert Stream name.
