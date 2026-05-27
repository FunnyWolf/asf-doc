# SIEM Index YAML

从后端实时发现字段并生成 SIEM 索引的 YAML 配置文件.

## 触发场景

- 新增 SIEM 索引,需要生成字段配置
- 已有索引的字段有变化,需要更新配置
- 查看 ELK/Splunk 索引实际有哪些字段

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| index_name | SIEM 索引名称 |
| backend | `ELK` 或 `Splunk` |

## 输出

YAML 配置文件,写入 `DATA/PLUGINS/SIEM/<index_name>.yaml`,包含:

```yaml
name: <index_name>
backend: <backend>
description: <描述>
fields:
  - name: <字段名>
    type: <类型>
    description: <描述>
    is_key_field: true/false
    sample_values: [...]
```

## 依赖

调用 MCP 工具: `siem_discover_index_fields`.

> 必须通过 `siem_discover_index_fields` 获取实时字段,不能手动编写. `description` 和 `is_key_field` 由模型推断,需用户确认后写入.
