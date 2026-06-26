# CMDB

CMDB Skill 用于查询 Artifact 的资产、身份、负责人和业务上下文。

## 触发场景

- 判断某个 IP、主机、账号或资源是否属于内部资产。
- 查询资产负责人、业务系统、重要性或身份上下文。
- 为 Artifact 或 Case 生成资产类 Enrichment。

## 输入

| 输入 | 说明 |
| --- | --- |
| `artifact_type` | Artifact 类型。 |
| `artifact_value` | Artifact 值。 |
| `provider` | 可选 Provider。 |

## 输出

CMDB 查询结果，包括资产、身份或业务上下文。

## 依赖

MCP 工具：`cmdb_lookup`。
