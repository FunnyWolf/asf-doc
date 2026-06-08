# SIEM Search

SIEM log investigation: index/field exploration, keyword search, precise filtered queries, and raw SPL/ES|QL queries.

## Trigger Scenarios

- Don't know which index the logs are in and need to explore first
- Search for related logs using IOCs or keywords
- Know the index and fields, need to perform precise filtering and aggregation
- Already have a SPL or ES|QL query and need to execute it directly

## Usage Examples

![img.png](img.png)

## Four Modes

| Mode        | Scenario              | MCP Tool                |
|-----------|-----------------|-----------------------|
| Schema Exploration | Unknown index/field structure      | `siem_explore_schema` |
| Keyword Search     | Clues are vague, starting from keywords     | `siem_keyword_search` |
| Precise Query      | Index and fields known, need filtering/aggregation | `siem_adaptive_query` |
| SPL Query     | Have a Splunk SPL query  | `siem_execute_spl`    |
| ES|QL Query   | Have an ELK ES|QL query    | `siem_execute_esql`   |

### How to Choose

- User provides a raw SPL query → `siem_execute_spl`
- User provides a raw ES|QL query → `siem_execute_esql`
- Clue is a keyword → `siem_keyword_search`
- Known index + known field conditions → `siem_adaptive_query`
- Uncertain about index/fields → use `siem_explore_schema` first

## Input

| Parameter                   | Description                              |
|----------------------|---------------------------------|
| keyword              | Keyword or keyword list (list uses AND matching)           |
| query                | Raw SPL or ES|QL query string              |
| index_name           | Index name (optional for keyword search, required for precise query)            |
| time_range_start/end | UTC time, ISO8601 format               |
| filters              | Precise field filters (for precise queries)                   |
| aggregation_fields   | Aggregation fields (optional)                      |
| limit                | Max records to return (SPL/ES|QL default 100)         |

## Output

Search results auto-adjust based on hit count:

- <= 100 records: Complete records
- 100~1000 records: Statistics + 5 samples
- > 1000 records: Statistics only

## Dependencies

MCP tools: `siem_explore_schema`, `siem_keyword_search`, `siem_adaptive_query`, `siem_execute_spl`, `siem_execute_esql`, `get_current_time`.
