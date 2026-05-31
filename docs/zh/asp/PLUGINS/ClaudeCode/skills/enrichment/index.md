# Enrichment

将结构化分析结果保存为 Enrichment 并挂载到 Case、Alert 或 Artifact。

## 触发场景

- 调查结论需要持久化到平台
- SIEM 查询结果、威胁情报、资产上下文需要附加到某个对象。
- 分析师希望记录结构化的调查发现。

## 使用样例

![img.png](img.png)

## 输入

| 参数        | 说明                                                    |
|-----------|-------------------------------------------------------|
| target_id | 挂载目标，如 `case_000001`、`alert_000001`、`artifact_000001` |
| name      | Enrichment 名称                                         |
| type      | 类型（Threat Intelligence、Geo Location、CMDB 等）         |
| value     | 值                                                     |
| desc      | 摘要                                                    |
| data      | 详细 JSON 数据                                            |

## 输出

创建的 Enrichment 记录 ID 及挂载确认。

## 依赖

调用 MCP 工具：`create_enrichment`。
