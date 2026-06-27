# Alert

Alert Skill is used to view ASP alerts and perform triage analysis.

## Trigger Scenarios

- View, review, or summarize an alert.
- Find alerts by status, severity, confidence, or Correlation UID.
- Need to continue viewing Case, Artifact, or Enrichment based on alert.

## Usage Example

![Alert Skill](img.png)

## Input

| Input | Description |
|-------|-------------|
| `alert_id` | Readable alert ID, e.g., `alert_000001`. |
| `status` | Alert status. |
| `severity` | Severity level. |
| `confidence` | Confidence level. |
| `correlation_uid` | Correlation ID. |

## Output

Alert summary, key context, associated Case / Artifact / Enrichment, and triage judgment.

## Dependencies

MCP tool: `list_alerts`.
