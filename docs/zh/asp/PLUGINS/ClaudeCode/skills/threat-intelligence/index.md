# Threat Intelligence

查询 IOC(IP、哈希、URL、域名)的威胁情报,评估风险等级.

## 触发场景

- 检查某个 IP/域名/哈希是否恶意
- 获取 IOC 的风险评分、标签、关联恶意软件家族
- 为调查中的 Artifact 补充外部情报上下文

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| indicator | IOC 值(IP、哈希、URL、域名) |
| provider | 指定情报源(如 `AlienVaultOTX`),不填则查询所有源 |

## 输出

- `indicator`: IOC 值和检测到的类型
- `aggregated_risk_level`: 所有源中最高的风险等级
- 每个源的详情: 风险等级、声誉评分、标签、攻击技术、恶意软件家族、网络上下文

## 依赖

调用 MCP 工具: `ti_query`. 保存结果需配合 `asp-enrichment-en/zh`.
