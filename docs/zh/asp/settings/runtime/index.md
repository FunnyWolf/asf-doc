# Runtime

Runtime 保存 ASP 的 Agentic 运行配置，当前包含提示词语言和 Webhook Stream 保留长度。

## 入口

Runtime 设置位于 System Settings 的 `Runtime` Tab。

![Runtime 设置](img.png)

## 字段

| 字段              | 默认值     | 说明                                    |
|-----------------|---------|---------------------------------------|
| Prompt Language | `en`    | Agentic 分析和知识提取使用的提示词语言。              |
| Stream Maxlen   | `10000` | Webhook 告警写入 Redis Stream 时保留的近似最大长度。 |

## Prompt Language

Prompt Language 支持 `en` 和 `zh`。

后端会根据该值读取对应语言的提示词文件，例如：

- `backend\data\prompt\analysis\System_en.md`
- `backend\data\prompt\analysis\System_zh.md`
- `backend\data\prompt\analysis\KnowledgeKeywords_en.md`
- `backend\data\prompt\knowledge_extraction\System_en.md`

该配置影响 Case AI 调查、知识关键词提取和 Knowledge Extraction。

## Stream Maxlen

Stream Maxlen 用于控制 Splunk / Kibana Webhook 告警写入 Redis Stream 时的保留长度。

它很近似最大长度，用于避免告警 Stream 无限增长。默认值为 `10000`。

## 保存与审计

Runtime 页面只有 Save，没有 Test。保存配置后，后端会刷新 Runtime cache，后续读取 Runtime 配置的流程会使用新值。

Runtime 配置更新会写入 Audit Log。

## 使用建议

- 中文团队可以把 Prompt Language 设置为 `zh`，让调查和知识提取使用中文提示词。
- Stream Maxlen 根据告警量调整；告警量越大，保留长度可以适当增大。
- 修改 Runtime 后，建议从新的 Case 或新的 Webhook 告警开始观察效果。
