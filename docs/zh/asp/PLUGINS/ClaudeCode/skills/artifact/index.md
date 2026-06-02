# Artifact

按 IOC 值、类型、角色查找平台上的实体记录。

## 触发场景

- 查找某个 IP/域名/哈希是否在平台有记录
- 查看实体的类型、角色和关联信息
- 为实体附加分析结论（enrichment）

## 使用样例

![img.png](img.png)

## 输入

| 参数   | 说明                                    |
|------|---------------------------------------|
| 过滤条件 | value, type, role, owner, artifact_id |

## 输出

实体列表：ID、值、类型、角色、关联告警/富化信息。

## 依赖

调用 MCP 工具：`list_artifacts`。保存分析需配合 `asp-enrichment-en/zh`。
