# SIEM YAML

SIEM YAML 用于描述 Splunk / ELK 中可供 Agent 和 MCP 查询的索引结构。

## 配置位置

用户自定义 SIEM YAML 放在：

```text
custom/data/siem/*.yaml
```

示例 YAML 位于：

```text
backend\examples\siem\*.yaml
```

每个 YAML 文件描述一个可查询索引。

当前后端只从 `custom\data\siem\*.yaml` 加载配置。只有写入 YAML 的索引才会出现在 `siem_explore_schema` 中。

修改 YAML 后，可以在 `System Settings` → `Runtime` 中点击 `Refresh / Validate` 重新扫描。

`backend\examples\siem\` 中的 YAML 只作为示例，不会被生产运行时自动加载。

## 基本结构

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

## 字段说明

| 字段 | 说明 |
| --- | --- |
| `name` | 索引名。 |
| `backend` | `ELK` 或 `Splunk`。 |
| `description` | 索引用途说明。 |
| `fields[].name` | 字段名。 |
| `fields[].type` | 字段类型。 |
| `fields[].description` | 字段含义。 |
| `fields[].is_key_field` | 是否作为默认聚合字段。 |
| `fields[].sample_values` | 示例值。 |

## 使用场景

- `siem_explore_schema` 用它展示可用索引和字段。
- `siem_adaptive_query` 用它确定后端和默认聚合字段。
- SIEM Search / SIEM Rule / Threat Hunting 等 ClaudeCode Skill 会基于它理解日志结构。

## 查询流程

```text
SIEM YAML
  → siem_explore_schema 展示索引与字段
  → siem_keyword_search / siem_adaptive_query 选择后端
  → Splunk / ELK 执行查询
  → Agent 汇总证据
```

YAML 不保存日志数据，只保存索引和字段说明。

## 使用建议

- 只为需要被 Agent 查询的索引创建 YAML。
- 给关键字段写清楚业务含义，而不是只写字段名。
- 将高价值字段标记为 `is_key_field: true`，例如用户、主机、IP、域名、进程、云账号等。
- 可以使用 [SIEM Index YAML](../../integrations/claude-code/skills/siem-index-yaml/) Skill 辅助生成。
