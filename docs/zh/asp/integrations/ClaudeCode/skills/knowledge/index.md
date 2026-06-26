# Knowledge

内部知识库关键词搜索与维护。

## 触发场景

- 按关键词在知识库中搜索相关内容
- 更新知识条目的标题、内容、标签或过期时间

## 使用样例

![img.png](img.png)

## 输入

| 参数      | 说明                            |
|---------|-------------------------------|
| keyword | 搜索关键词，匹配 title 和 body         |
| 更新字段    | title, body, expires_at, tags |

## 输出

知识条目列表：ID、标题、标签。

## 依赖

调用 MCP 工具：`search_knowledge`、`update_knowledge`。

> 搜索自动过滤已过期的记录。知识可通过 Knowledge Extraction 剧本从结案 Case 中自动提取。
