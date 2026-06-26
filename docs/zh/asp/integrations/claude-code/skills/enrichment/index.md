# Enrichment

Enrichment Skill 用于把结构化调查结果保存为 Enrichment，并挂载到 Case、Alert 或 Artifact。

## 触发场景

- 需要把 SIEM 查询结果、威胁情报、资产上下文或调查结论持久化。
- 希望把结构化分析结果附加到某个对象。

## 使用样例

![Enrichment Skill](img.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `target_id` | 挂载目标，例如 `case_000001`、`alert_000001`、`artifact_000001`。 |
| `name` | Enrichment 名称。 |
| `type` | 类型，例如 Threat Intelligence、CMDB、Identity。 |
| `value` | 富化值。 |
| `desc` | 摘要。 |
| `data` | 详细 JSON 数据。 |

## 输出

创建的 Enrichment 记录 ID 和挂载确认。

## 依赖

MCP 工具：`create_enrichment`。
