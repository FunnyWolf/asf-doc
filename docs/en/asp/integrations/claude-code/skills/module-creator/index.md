# Module Creator

Module Creator Skill is used to create ASP alert processing modules for SIEM Rules.

## Trigger Scenarios

- Write Python Module under `custom/modules/` for new SIEM Rule.
- Convert raw alerts written by Webhook or ELK Index Action into Case / Alert / Artifact.
- Design Correlation UID and Artifact extraction logic.

## Usage Example

![Module Creator Skill](img.png)

## Input

| Input | Description |
|-------|-------------|
| Rule name | Typically also used as Redis Stream name. |
| Raw alert sample | Obtained from Stream, sample file, or user paste. |
| Aggregation strategy | Fields and time window for Correlation UID. |

## Output

Recommended Module file, field mapping, Artifact extraction logic, Correlation UID design, and verification method.

## Dependencies

- `custom/modules/`
- Current backend Case / Alert / Artifact enumeration model
- MCP tool: Stream reading related tools
