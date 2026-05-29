# Case

Case management: view, filter, update workflow/AI analysis fields, and view discussion records.

## Trigger Scenarios

- View/understand a specific Case
- Filter Cases by status/severity/verdict
- Update Case status, verdict, severity, or analyst comments
- View discussion records of a Case

## Usage Examples

![img.png](img.png)

![img_1.png](img_1.png)

## Input

| Parameter      | Description                                                                                  |
|---------|-------------------------------------------------------------------------------------|
| case_id | Case ID, e.g. `case_000001`                                                             |
| Filters    | status, severity, confidence, verdict, correlation_uid, title, tags                 |
| Update fields    | severity, status, verdict, severity_ai, confidence_ai, verdict_ai, comment, summary |

## Output

Case details: ID, title, severity, status, verdict, confidence, timeline, associated alerts, discussion records, AI analysis fields.

## Dependencies

MCP tool: `list_cases`, `update_case`. Saving analysis requires `asp-enrichment-en/zh`.
