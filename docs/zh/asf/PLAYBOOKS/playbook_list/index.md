# 剧本列表

所有剧本代码均位于 `PLAYBOOKS` 目录下

## [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM/)

- Langgraph 构建
- 异步执行
- 用于分析汇总分析 Alert 生成 Suggestion

## [Artifact_TI_Enrichment_By_AlienVaultOTX](../Artifact_TI_Enrichment_By_AlienVaultOTX/)

- 异步执行
- 调用 AlienVaultOTX 插件接口更新 Artifact 的 enrichment

## [Artifact_TI_Enrichment_Update](../Artifact_TI_Enrichment_Update/)

- 异步执行
- 模拟威胁情报查询,更新 Artifact 的 enrichment

## [Case_Suggestion_Gen_By_LLM](../Case_L3_SOC_Analyst_Agent/)

- Langgraph 构建
- 异步执行
- 汇总分析 Case 生成 Case 的 Severity/Confidence/Attack Stage/Analysis Rationale/Recommended Actions

## [TI_Artifact_query_by_AlienVaultOTX](../TI_Artifact_query_by_AlienVaultOTX/)

- 同步执行
- 用于模拟威胁情报查询