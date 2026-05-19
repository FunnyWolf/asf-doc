# Investigation (案件调查)

## 注册名称

```
Investigation
```

## 剧本文件

```
PLAYBOOKS/Investigation.py
```

## 功能介绍

- 对指定 Case 执行 AI 调查分析,生成结构化调查报告.
- 从案件中提取知识关键词,检索知识库中的相关记录,结合案件上下文调用 LLM 生成调查报告.
- 调查报告包含:判决结果、严重程度、影响评估、置信度、摘要、受影响资产、证据发现、攻击链、时间线、IOC、修复建议等.

## 执行流程

1. 加载 Case 完整数据
2. 提取知识关键词
3. 检索知识库匹配记录
4. 获取案件讨论记录
5. 调用 LLM 生成结构化调查报告
6. 将报告写回 Case 的 AI 分析字段

## 触发方式

- 在 SIRP 平台的 Case 详情页手动执行 Playbook
- 也可通过 MCP 工具 `execute_playbook` 触发

## 调试

```python
# 本地调试
python PLAYBOOKS/Investigation.py
```

修改 `source_row_id` 为实际 Case 的 row_id.
