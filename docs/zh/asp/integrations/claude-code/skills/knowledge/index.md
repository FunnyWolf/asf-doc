# Knowledge

Knowledge Skill 用于搜索和维护 ASP 知识库。

## 触发场景

- 按关键词搜索历史经验、处理建议或误报判断。
- 更新知识条目的标题、正文、标签或过期时间。
- 在 Case 调查中查找可复用经验。

## 使用样例

![Knowledge Skill](img.png)

## 输入

| 输入 | 说明 |
| --- | --- |
| `keyword` | 搜索关键词，匹配 title、body 或 tags。 |
| `knowledge_id` | 可读知识 ID。 |
| 更新字段 | `title`、`body`、`expires_at`、`tags`。 |
| `include_comments` | 可选，显式读取知识条目的最近评论和附件元数据。 |

## 输出

知识条目列表或更新后的知识记录；需要讨论上下文时可显式包含评论。

## 依赖

MCP 工具：`search_knowledge`、`update_knowledge`。
