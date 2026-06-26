# SIEM Index YAML

SIEM Index YAML Skill 用于创建或更新 SIEM 索引配置 YAML。

## 触发场景

- 为 Splunk 或 ELK 中的索引生成 `backend/data/siem/*.yaml`。
- 从后端实时发现字段，并为字段补充说明、类型和关键字段标记。
- 让 Agent / MCP 能通过 schema 理解和查询 SIEM 数据源。

## 使用样例

![SIEM Index YAML Skill](img.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `index_name` | SIEM 索引名。 |
| `backend` | `Splunk` 或 `ELK`。 |
| 时间范围 | 用于发现字段样本。 |

## 输出

YAML 草案或写入后的索引配置文件。

## 依赖

MCP 工具：`siem_discover_index_fields`、`siem_explore_schema`。
