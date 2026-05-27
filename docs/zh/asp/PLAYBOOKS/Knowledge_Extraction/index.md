# Knowledge Extraction

从已关闭 (有 verdict) 的 Case 中自动提取可复用的安全知识,存入 SIRP Knowledge 工作表.

## 注册名称

`Knowledge Extraction`

## 执行流程

1. 加载 Case 完整数据
2. 检查 Case 是否有 verdict (无 verdict 则跳过)
3. 序列化案件数据为 AI 分析格式,获取讨论记录
4. 调用 LLM 提取知识 (标题、正文、标签)
5. 如有可提取知识,创建 Knowledge 记录

## 触发方式

- SIRP 平台 Case 详情页手动执行 Playbook
- 适用于已关闭并标记了 verdict 的案件
