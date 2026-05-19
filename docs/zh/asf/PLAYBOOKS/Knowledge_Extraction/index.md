# Knowledge Extraction (知识提取)

## 注册名称

```
Knowledge Extraction
```

## 剧本文件

```
PLAYBOOKS/Knowledge_Extraction.py
```

## 功能介绍

- 从已关闭(有 verdict)的 Case 中自动提取可复用的安全知识.
- 使用 LLM 分析案件数据和讨论记录,提取标题、正文、标签等结构化知识.
- 提取的知识自动存入 SIRP Knowledge 工作表,供后续案件分析参考.

## 执行流程

1. 加载 Case 完整数据
2. 检查 Case 是否有 verdict (无 verdict 则跳过)
3. 序列化案件数据为 AI 分析格式
4. 获取案件讨论记录
5. 调用 LLM 提取知识
6. 如有可提取知识,创建 Knowledge 记录

## 触发方式

- 在 SIRP 平台的 Case 详情页手动执行 Playbook
- 适用于已关闭并标记了 verdict 的案件

## 调试

```python
# 本地调试
python PLAYBOOKS/Knowledge_Extraction.py
```

修改 `source_row_id` 为实际 Case 的 row_id.
