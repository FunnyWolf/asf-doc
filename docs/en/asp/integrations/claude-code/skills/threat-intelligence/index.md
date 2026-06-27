# Threat Intelligence

Threat Intelligence Skill is used to query IOC threat intelligence and assess risk levels.

## Trigger Scenarios

- Query threat intelligence for IP, URL, file hash, and other IOC.
- Determine whether an Artifact is malicious.
- Save query results as Enrichment to Artifact or Case.

## Usage Example

![Threat Intelligence Skill](img.png)

## Input

| Input | Description |
|-------|-------------|
| `indicator` | IOC value. |
| `artifact_type` | Artifact type. |
| `provider` | Optional intelligence source. |

## Output

Provider results, risk level, reputation, malicious judgment, tags, and error information.

## Dependencies

MCP tool: `ti_query`. Use with `asp-enrichment` when saving results.
