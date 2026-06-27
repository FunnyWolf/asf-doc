# SIEM YAML

SIEM YAML is used to describe the index structure in Splunk / ELK that can be queried by Agent and MCP.

## Configuration Location

User-defined SIEM YAML is placed in:

```text
custom/data/siem/*.yaml
```

Test YAML in the source repository is located at:

```text
backend\custom\data\siem\*.yaml
```

Each YAML file describes a queryable index.

The backend currently only loads configuration from `custom\data\siem\*.yaml`. Only indexes written to YAML will appear in `siem_explore_schema`.

After modifying YAML, you can click `Refresh / Validate` in `System Settings` → `Runtime` to rescan.

The `custom\data\siem\` in the release package is an empty template by default and does not include test YAML.

## Basic Structure

```yaml
name: siem-network-traffic
backend: ELK
description: Network traffic logs

fields:
  - name: source.ip
    type: ip
    description: Source IP
    is_key_field: true
    sample_values: ["10.0.0.19"]
```

## Field Description

| Field | Description |
| --- | --- |
| `name` | Index name. |
| `backend` | `ELK` or `Splunk`. |
| `description` | Index purpose description. |
| `fields[].name` | Field name. |
| `fields[].type` | Field type. |
| `fields[].description` | Field meaning. |
| `fields[].is_key_field` | Whether to use as default aggregation field. |
| `fields[].sample_values` | Sample values. |

## Usage Scenarios

- `siem_explore_schema` uses it to display available indexes and fields.
- `siem_adaptive_query` uses it to determine backend and default aggregation fields.
- ClaudeCode Skills such as SIEM Search / SIEM Rule / Threat Hunting use it to understand log structure.

## Query Flow

```text
SIEM YAML
  → siem_explore_schema displays indexes and fields
  → siem_keyword_search / siem_adaptive_query selects backend
  → Splunk / ELK executes query
  → Agent summarizes evidence
```

YAML does not store log data, only index and field descriptions.

## Usage Recommendations

- Only create YAML for indexes that need to be queried by Agent.
- Write clear business meanings for key fields, not just field names.
- Mark high-value fields as `is_key_field: true`, such as user, host, IP, domain, process, cloud account, etc.
- 可以使用 [SIEM Index YAML](../../integrations/claude-code/skills/siem-index-yaml/) Skill 辅助生成。
