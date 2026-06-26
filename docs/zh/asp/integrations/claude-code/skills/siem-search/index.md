# SIEM Search

SIEM Search Skill 用于在 ASP SIEM 中进行日志调查、事件检索、字段探索和结构化分析。

## 触发场景

- 根据 IOC、Case、Alert 或 Artifact 上下文搜索相关日志。
- 探索有哪些 index 和字段可用。
- 执行关键词搜索、结构化查询、SPL 或 ES|QL。

## 使用样例

![SIEM Search Skill](img.png)

## 四种模式

| 模式 | 适用场景 |
| --- | --- |
| `siem_explore_schema` | 不知道有哪些 index 或字段。 |
| `siem_keyword_search` | 有关键词或 IOC，需要快速搜索。 |
| `siem_adaptive_query` | 已知 index 和字段条件，需要结构化查询或聚合。 |
| `siem_execute_spl` / `siem_execute_esql` | 用户已经写好 SPL 或 ES|QL。 |

### 如何选择

- 有现成 SPL：使用 `siem_execute_spl`。
- 有现成 ES|QL：使用 `siem_execute_esql`。
- 线索是关键词：使用 `siem_keyword_search`。
- 已知 index 和精确字段：使用 `siem_adaptive_query`。
- 不知道数据源：先使用 `siem_explore_schema`。

## 输入

关键词、index、时间范围、字段过滤、聚合字段或原始 SPL / ES|QL。

## 输出

日志命中、分布、证据要点和下一步调查建议。

## 依赖

MCP 工具：`siem_explore_schema`、`siem_keyword_search`、`siem_adaptive_query`、`siem_execute_spl`、`siem_execute_esql`。
