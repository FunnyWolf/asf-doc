# Alert

Alert Skill 用于查看 ASP 告警并进行分诊分析。

## 触发场景

- 查看、审查或总结某条告警。
- 按状态、严重级别、置信度或 Correlation UID 查找告警。
- 需要基于告警继续查看 Case、Artifact 或 Enrichment。

## 使用样例

![Alert Skill](img.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `alert_id` | 可读告警 ID，例如 `alert_000001`。 |
| `status` | 告警状态。 |
| `severity` | 严重级别。 |
| `confidence` | 置信度。 |
| `correlation_uid` | 关联 ID。 |
| `include_comments` | 可选，显式读取最近评论和附件元数据。 |

## 输出

告警摘要、关键上下文、关联 Case / Artifact / Enrichment、可选评论，以及分诊判断。

## 依赖

MCP 工具：`list_alerts`。
