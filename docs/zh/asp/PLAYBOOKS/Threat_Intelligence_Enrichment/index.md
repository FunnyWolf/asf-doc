# Threat Intelligence Enrichment

为 Case 关联的所有 Artifact 执行威胁情报富化,通过 AlienVault OTX 查询结果以 Enrichment 形式写入对应 Artifact.

## 注册名称

`Threat Intelligence Enrichment`

## 执行流程

1. 加载 Case 完整数据 (含 Alert 和 Artifact 关联)
2. 收集所有 Artifact 并去重 (按 row_id)
3. 逐一通过 `TIToolKit.query()` 查询 AlienVault OTX
4. 将查询结果创建/更新为 Artifact 的 Enrichment 记录 (含声誉评分、脉冲信息等)
5. 输出统计信息:告警数、Artifact 数、富化成功/失败数

## 触发方式

- SIRP 平台 Case 详情页手动执行 Playbook
- MCP 工具 `execute_playbook` 触发
