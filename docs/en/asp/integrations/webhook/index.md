# Webhook

Webhook is used to receive alerts directly POSTed by external systems. It is suitable for scenarios where SIEM or alert platforms can access ASP API.

## Current Endpoints

| Source | API |
|--------|-----|
| [Splunk](splunk/) | `/api/webhook/splunk/` |
| [ELK / Kibana](elk/) | `/api/webhook/kibana/` |

After receiving alerts, the backend enters the current alert processing flow, generating or associating Alert, Case, Artifact, and other resources.

## Difference from ELK Index Action

| Method | Description |
|--------|-------------|
| Webhook | SIEM directly POSTs to ASP's Webhook endpoint. |
| [ELK Index Action](../elk-index-action/) | Kibana first writes actions to Elasticsearch index, then ASP's worker polls and reads them. |

## Usage Recommendations

- Configure alert Action in SIEM to point to the corresponding endpoint.
- Keep unique ID, rule name, product information, and raw log fields in source alerts complete.
- Use Correlation UID to aggregate multiple Alerts from the same event into the same Case.
