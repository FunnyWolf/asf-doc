# Alert

View and filter ASP alerts for triage analysis.

## Trigger Scenarios

- View details of a specific alert
- Filter alerts by status/severity/confidence
- Locate key clues from alerts associated with a Case

## Usage Examples

![img.png](img.png)

## Input

| Parameter       | Description                                           |
|----------|-----------------------------------------------|
| alert_id | Alert ID, e.g. `alert_000001`                        |
| Filters     | status, severity, confidence, correlation_uid |

## Output

Alert details: ID, title, severity, status, confidence, associated rule, timeline, MITRE ATT&CK mapping.

## Dependencies

MCP tool: `list_alerts`. Saving analysis requires `asp-enrichment-en/zh`.
