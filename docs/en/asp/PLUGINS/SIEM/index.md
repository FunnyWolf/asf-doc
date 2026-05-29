# SIEM Plugin

A unified SIEM query interface supporting ELK and Splunk backends.

## How It Works

The SIEM plugin **works based on YAML configuration**, rather than directly connecting to SIEM to search all indices. Users need to create YAML configuration files for the indices they want to search, and the plugin can only execute queries after loading these configurations.

```
User writes YAML config → Plugin loads config → Understands available indices/backends/fields → Executes query
```

This means:

- Only indices with YAML configuration can be searched
- Unconfigured indices will not appear in the search scope
- Configuration is required before searching; this is a prerequisite for using this plugin

The rationale behind this design:

- **Query Performance** — No need to connect to the backend to discover available indices and fields before each search; the YAML configuration already caches this information locally
- **Discovery Performance** — When users or LLMs need to know which logs are available, they can simply read the configuration without querying the backend in real time
- **Scope Control** — There may be a large number of indices in SIEM, but the SOC scenario or LLM may only need to focus on a subset; YAML configuration can precisely control the search scope
- **Supplementary Metadata** — SIEM itself does not support adding descriptions to fields or indices, yet metadata such as which fields are key fields and what fields mean is very valuable for LLM queries; YAML configuration can carry this information

## Configuration

Create a YAML configuration file for each index under the `DATA/PLUGINS/SIEM/` directory. The plugin automatically selects the backend based on the `backend` field.

### YAML Structure

```yaml
name: siem-network-traffic        # Index name
backend: ELK                       # ELK or Splunk
description: Network traffic logs  # Description

fields:
  - name: source.ip                # Field name
    type: ip                       # Field type
    description: Source IP         # Description
    is_key_field: true             # Whether it is a key field (used for aggregation statistics)
    sample_values: [ "10.0.0.19" ]   # Sample values
```

- Fields with `is_key_field: true` are used as the default aggregation fields during queries
- Sample values are optional and help understand the meaning of fields

### Generating YAML

It is recommended to use the Claude Code Skill [SIEM Index YAML](../ClaudeCode/skills/siem-index-yaml/) to assist generation. This Skill calls `discover_index_fields` to discover fields from the backend in real time and automatically generates configuration files.

### Test Configuration

`DATA/PLUGINS/SIEM/` contains three test examples:

| File                          | Index Name               | Description                |
|-------------------------------|--------------------------|----------------------------|
| `siem-network-traffic.yaml`   | `siem-network-traffic`   | Network traffic logs       |
| `siem-host-events.yaml`       | `siem-host-events`       | Host event logs            |
| `siem-aws-cloudtrail.yaml`    | `siem-aws-cloudtrail`    | AWS CloudTrail logs        |

These can be used with the [Mock Plugin](../Mock/index.md)'s SIEM simulated data. In production, these three test configurations should be removed to avoid interfering with queries.

## Usage

`SIEMToolKit` provides four methods:

| Method                     | Description                                                                     |
|----------------------------|---------------------------------------------------------------------------------|
| `explore_schema`           | List all configured indices, or view the field definitions of a specified index  |
| `execute_adaptive_query`   | Exact match query, automatically selects return mode based on result count       |
| `keyword_search`           | Keyword search; when no index is specified, automatically discovers across configured indices |
| `discover_index_fields`    | Discover index fields from the backend in real time (for generating YAML configuration, not for daily searches) |

### Adaptive Return Mode

`execute_adaptive_query` and `keyword_search` automatically adjust returned content based on hit count:

| Mode      | Condition         | Returned Content                  |
|-----------|-------------------|-----------------------------------|
| `records` | <= 100 hits       | Complete records                  |
| `sample`  | 100 ~ 1000 hits   | Statistics + 5 sample records     |
| `summary` | > 1000 hits       | Statistics only                   |
