# Playbook 扩展

Playbook 是 ASP 中面向 Case 的自动化任务。

## 当前脚本位置

内置示例位于：

```text
backend/playbooks/
```

当前示例包括：

- `investigation.py`
- `knowledge_extraction.py`
- `threat_intelligence_enrichment.py`
- `cmdb_enrichment.py`

## 数据落点

Playbook 不应只输出临时文本。推荐把结果写回：

- Case：调查报告、AI 评估、摘要。
- Knowledge：从案件提取的可复用知识。
- Enrichment：威胁情报、资产、身份或历史上下文。
- Playbook：任务状态、备注和后台任务 ID。

## 设计建议

- 输入围绕 Case。
- 输出结构化。
- 失败原因写入任务记录。
- 外部查询结果写入 Enrichment，便于后续审计和复用。
