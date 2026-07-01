# Artifact

Artifact Skill is used to find entity records in the platform by IOC value, type, or role.

## Trigger Scenarios

- Find whether a specific IP, domain, URL, file hash, account, or host appears in ASP.
- View entity Type, Role, Value, and associated alerts.
- Add Enrichment to entity or continue threat intelligence query.

## Usage Example

![Artifact Skill](img.png)

## Input

| Input | Description |
|-------|-------------|
| `artifact_id` | Readable entity ID, e.g., `artifact_000001`. |
| `value` | Entity value. |
| `type` | Entity type. |
| `role` | Entity role in incident. |
| `include_comments` | Optional, explicitly fetch recent comments and attachment metadata. |

## Output

Artifact list or single entity details, including associated alerts, enrichment count, and optional comments.

## Dependencies

MCP tool: `list_artifacts`.
