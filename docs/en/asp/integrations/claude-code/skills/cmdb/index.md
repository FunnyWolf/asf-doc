# CMDB

CMDB Skill is used to query asset, identity, owner, and business context for Artifact.

## Trigger Scenarios

- Determine whether a specific IP, host, account, or resource belongs to internal assets.
- Query asset owner, business system, importance, or identity context.
- Generate asset-type Enrichment for Artifact or Case.

## Input

| Input | Description |
|-------|-------------|
| `artifact_type` | Artifact type. |
| `artifact_value` | Artifact value. |
| `provider` | Optional provider. |

## Output

CMDB query results, including asset, identity, or business context.

## Dependencies

MCP tool: `cmdb_lookup`.
