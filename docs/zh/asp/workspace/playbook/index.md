# Playbook

Playbook 是从 Case 触发的自动化任务记录。

## 关键字段

- Playbook ID：系统生成的可读 ID。
- Case：触发来源。
- Name：执行的剧本名称。
- User Input：初始或追加输入。
- User：请求用户。
- Job Status：Success、Failed、Pending、Running。
- Job ID：后台任务 ID。
- Remark：执行备注。

## 当前内置方向

当前后端包含以下 Playbook 示例：

- Investigation：案件调查。
- Knowledge Extraction：知识提取。
- Threat Intelligence Enrichment：威胁情报富化。
- CMDB Enrichment：资产信息富化。

Playbook 的输出应写回 Case、Knowledge 或 Enrichment，而不是停留在临时日志中。
