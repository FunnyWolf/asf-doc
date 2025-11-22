# Playbook List

All playbook code is located in the `PLAYBOOKS` directory.

## [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM/)

- Built with Langgraph
- Asynchronous execution
- Used to analyze and summarize Alerts to generate Suggestions.

## [Artifact_TI_Enrichment_By_AlienVaultOTX](../Artifact_TI_Enrichment_By_AlienVaultOTX/)

- Asynchronous execution
- Calls the AlienVaultOTX plugin interface to update the enrichment of an Artifact.

## [Artifact_TI_Enrichment_Update](../Artifact_TI_Enrichment_Update/)

- Asynchronous execution
- Simulates a threat intelligence query to update the enrichment of an Artifact.

## [Case_Suggestion_Gen_By_LLM](../Case_L3_SOC_Analyst_Agent/)

- Built with Langgraph
- Asynchronous execution
- Summarizes and analyzes a Case to generate the Case's Severity/Confidence/Attack Stage/Analysis Rationale/Recommended Actions.

## [TI_Artifact_query_by_AlienVaultOTX](../TI_Artifact_query_by_AlienVaultOTX/)

- Synchronous execution
- Used to simulate a threat intelligence query.