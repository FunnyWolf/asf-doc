# Enrichment

Save structured analysis results as Enrichment and attach it to a Case, Alert, or Artifact.

## Trigger Scenarios

- Investigation conclusions need to be persisted to the platform
- SIEM query results, threat intelligence, or asset context need to be attached to an object
- Analyst wants to record structured investigation findings

## Usage Examples

![img.png](img.png)

## Input

| Parameter        | Description                                                    |
|-----------|-------------------------------------------------------|
| target_id | Attachment target, e.g. `case_000001`, `alert_000001`, `artifact_000001` |
| name      | Enrichment name                                         |
| type      | Type (Threat Intelligence, Geo Location, CMDB, etc.)         |
| value     | Value                                                     |
| desc      | Summary                                                    |
| data      | Detailed JSON data                                            |

## Output

The created Enrichment record ID and attachment confirmation.

## Dependencies

MCP tool: `create_enrichment`.
