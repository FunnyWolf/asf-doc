# SIEM Search

SIEM 日志调查：索引/字段探索、关键词搜索、精确过滤、原始 SPL/ES|QL 查询。

## 触发场景

- 不知道日志在哪个索引，需要先探索
- 用 IOC 或关键词搜索相关日志
- 已知索引和字段,做精确过滤和聚合统计
- 已有 SPL 或 ES|QL 查询语句，需要直接执行

## 使用样例

![img.png](img.png)

## 四种模式

| 模式        | 场景              | MCP 工具                |
|-----------|-----------------|-----------------------|
| Schema 探索 | 不知道索引/字段结构      | `siem_explore_schema` |
| 关键词搜索     | 线索模糊，从关键词出发     | `siem_keyword_search` |
| 精确查询      | 索引和字段已知，需要过滤/聚合 | `siem_adaptive_query` |
| SPL 查询     | 已有 Splunk SPL 语句  | `siem_execute_spl`    |
| ES|QL 查询   | 已有 ELK ES|QL 语句    | `siem_execute_esql`   |

### 如何选择

- 用户直接给出 SPL → `siem_execute_spl`
- 用户直接给出 ES|QL → `siem_execute_esql`
- 线索是关键词 → `siem_keyword_search`
- 已知索引 + 已知字段条件 → `siem_adaptive_query`
- 不确定索引/字段 → 先 `siem_explore_schema`

## 输入

| 参数                   | 说明                              |
|----------------------|---------------------------------|
| keyword              | 关键词或关键词列表（列表为 AND 匹配）           |
| query                | 原始 SPL 或 ES|QL 查询语句              |
| index_name           | 索引名称（关键词搜索可选，精确查询必填）            |
| time_range_start/end | UTC 时间，ISO8601 格式               |
| filters              | 精确字段过滤（精确查询时）                   |
| aggregation_fields   | 聚合统计字段（可选）                      |
| limit                | 最大返回条数（SPL/ES|QL 默认 100）         |

## 输出

搜索结果根据命中量自动调整：

- <= 100 条: 完整记录
- 100~1000 条: 统计信息 + 5 条采样
- > 1000 条: 仅统计信息

## 依赖

调用 MCP 工具：`siem_explore_schema`、`siem_keyword_search`、`siem_adaptive_query`、`siem_execute_spl`、`siem_execute_esql`、`get_current_time`。
