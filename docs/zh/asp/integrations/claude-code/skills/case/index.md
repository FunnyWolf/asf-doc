# Case

Case Skill 用于查看、更新和审查 ASP 安全案件。

## 触发场景

- 查看某个 Case 的状态、风险、判定、负责人和上下文。
- 列出符合条件的 Case。
- 更新 Case 的人工字段，例如状态、负责人、verdict、summary。

## 使用样例

![Case Skill](img.png)

![Case 更新](img_1.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `case_id` | 可读案件 ID，例如 `case_000001`。 |
| `status` | 案件状态。 |
| `severity` / `confidence` / `impact` / `priority` | 人工评估字段。 |
| `verdict` | 人工判定。 |
| `include_comments` | 可选，显式读取最近评论；附件只返回文件名、`file_key` 和下载地址。 |

## 输出

Case 摘要、关键证据、AI 分析、可选评论、时间线和可执行下一步。`include_related` 不会隐式返回评论，需要评论时使用 `include_comments`。

## 依赖

MCP 工具：`list_cases`、`update_case`。
