# Investigation

对指定 Case 执行 AI 调查分析,生成结构化调查报告并写回 Case 的 AI 分析字段.

## 注册名称

`Investigation`

## 执行流程

1. 加载 Case 完整数据
2. 提取知识关键词,检索知识库匹配记录
3. 获取案件讨论记录
4. 调用 LLM 生成结构化调查报告 (含判决结果、严重程度、影响评估、摘要、攻击链、IOC、修复建议等)
5. 将报告写回 Case 的 AI 分析字段

## 触发方式

- SIRP 平台 Case 详情页手动执行 Playbook
- MCP 工具 `execute_playbook` 触发
