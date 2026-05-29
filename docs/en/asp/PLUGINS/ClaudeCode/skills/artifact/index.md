# Artifact

Search for entity records on the platform by IOC value, type, or role.

## Trigger Scenarios

- Check if a specific IP/domain/hash has a record on the platform
- View the type, role, and associated information of an entity
- Attach analysis conclusions (enrichment) to an entity

## Usage Examples

![img.png](img.png)

## Input

| Parameter   | Description                                    |
|------|---------------------------------------|
| Filters | value, type, role, owner, artifact_id |

## Output

Entity list: ID, value, type, role, associated alerts/enrichment information.

## Dependencies

MCP tool: `list_artifacts`. Saving analysis requires `asp-enrichment-en/zh`.
