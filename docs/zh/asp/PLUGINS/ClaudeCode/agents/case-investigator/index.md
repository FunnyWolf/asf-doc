# Case Investigator

从 Case 出发的调查编排 Agent，自动选择最有价值的调查路径。

## 触发场景

- "帮我调查这个 Case"
- "这个 Case 证据够不够?"
- "接下来该看什么?"

## 使用样例

<!-- 截图 + 说明 -->

## 输入

| 参数 | 说明 |
|------|------|
| Case ID/描述 | Case 的 ID 或自然语言描述 |

## 输出

- `Case Understanding`: Case 代表什么
- `Current Signals`: 已知关键事实
- `Useful Pivots`: 值得继续的 pivot 方向
- `Evidence Gaps`: 仍需确认的信息
- `Recommended Next Step`: 1-3 个具体行动

## 依赖

底层调用：`asp-case-en/zh`、`asp-alert-en/zh`、`asp-artifact-en/zh`、`asp-siem-search-en/zh`、`asp-knowledge-en/zh`、`asp-enrichment-en/zh`、`asp-playbook-en/zh`
