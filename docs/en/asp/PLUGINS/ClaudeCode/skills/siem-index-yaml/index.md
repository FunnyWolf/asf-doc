# SIEM Index YAML

Discover fields from the backend in real time and generate YAML configuration files for SIEM indices.

## Trigger Scenarios

- New SIEM index added, need to generate field configuration
- Fields of an existing index have changed, need to update configuration
- View which fields actually exist in an ELK/Splunk index

## Usage Examples

![img.png](img.png)

## Input

| Parameter         | Description               |
|------------|------------------|
| index_name | SIEM index name        |
| backend    | `ELK` or `Splunk` |

## Output

YAML configuration file, written to `DATA/PLUGINS/SIEM/<index_name>.yaml`, containing:

```yaml
name: <index_name>
backend: <backend>
description: <description>
fields:
  - name: <field_name>
    type: <type>
    description: <description>
    is_key_field: true/false
    sample_values: [ ... ]
```

## Dependencies

MCP tool: `siem_discover_index_fields`.

> Fields must be obtained via `siem_discover_index_fields` in real time; do not write them manually. `description` and `is_key_field` are inferred by the model and require user confirmation before writing.
