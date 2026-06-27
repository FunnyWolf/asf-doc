# SIEM Search

SIEM Search Skill is used for log investigation, event retrieval, field exploration, and structured analysis in ASP SIEM.

## Trigger Scenarios

- Search related logs based on IOC, Case, Alert, or Artifact context.
- Explore which indexes and fields are available.
- Execute keyword search, structured queries, SPL, or ES|QL.

## Usage Example

![SIEM Search Skill](img.png)

## Four Modes

| Mode | Applicable Scenario |
|------|---------------------|
| `siem_explore_schema` | Don't know which indexes or fields are available. |
| `siem_keyword_search` | Have keywords or IOC, need quick search. |
| `siem_adaptive_query` | Know index and field conditions, need structured query or aggregation. |
| `siem_execute_spl` / `siem_execute_esql` | User has already written SPL or ES|QL. |

### How to Choose

- Have ready SPL: use `siem_execute_spl`.
- Have ready ES|QL: use `siem_execute_esql`.
- Clue is keyword: use `siem_keyword_search`.
- Know index and precise fields: use `siem_adaptive_query`.
- Don't know data source: first use `siem_explore_schema`.

## Input

Keywords, index, time range, field filters, aggregation fields, or raw SPL / ES|QL.

## Output

Log hits, distribution, evidence highlights, and next investigation recommendations.

## Dependencies

MCP tools: `siem_explore_schema`、`siem_keyword_search`、`siem_adaptive_query`、`siem_execute_spl`、`siem_execute_esql`.
