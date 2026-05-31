# Artifact Investigator

从 IOC/Artifact 出发的调查编排 Agent，查找 SIEM 频次分布、Knowledge 上下文、父级关联。

## 触发场景

- "调查这个 IP / 域名 / 哈希"
- "这个 IOC 在哪出现过?"
- "这个 Artifact 背后还有什么关联?"

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| IOC 值/Artifact ID | IP、域名、哈希、URL 等，或已有 Artifact 的 ID |

## 输出

- `Artifact Understanding`: 这个 IOC 是什么、为什么重要
- `Known Context`: 平台已有记录
- `Best Pivots`: 1-3 个最有价值的 pivot
- `Evidence Gaps`: 仍需确认的信息
- `Recommended Next Step`: 1-3 个具体行动

## 依赖

底层调用：`asp-artifact-en/zh`、`asp-siem-search-en/zh`、`asp-knowledge-en/zh`、`asp-enrichment-en/zh`、`asp-alert-en/zh`、`asp-case-en/zh`、`asp-playbook-en/zh`
