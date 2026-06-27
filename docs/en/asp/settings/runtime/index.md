# Runtime

Runtime stores ASP's Agentic runtime configuration, currently including prompt language, Webhook Stream retention length, and refresh/validate entry for custom definitions.

## Entry

Runtime settings are located in the `Runtime` Tab of System Settings.

![Runtime Settings](img.png)

## Fields

| Field | Default | Description |
|-------|---------|-------------|
| Prompt Language | `en` | Prompt language used for Agentic analysis and knowledge extraction. |
| Stream Maxlen | `10000` | Approximate maximum length retained when writing Webhook alerts to Redis Stream. |

## Prompt Language

Prompt Language supports `en` and `zh`.

The backend reads corresponding language prompt files based on this value, for example:

- `backend\data\prompt\analysis\System_en.md`
- `backend\data\prompt\analysis\System_zh.md`
- `backend\data\prompt\analysis\KnowledgeKeywords_en.md`
- `backend\data\prompt\knowledge_extraction\System_en.md`

This configuration affects Case AI investigation, knowledge keyword extraction, and Knowledge Extraction.

## Stream Maxlen

Stream Maxlen is used to control the retention length when Splunk / Kibana Webhook alerts are written to Redis Stream.

It is an approximate maximum length, used to avoid alert Stream无限增长。Default value is `10000`.

## Save and Audit

After saving Runtime configuration, the backend刷新 Runtime cache，后续读取 Runtime 配置的流程会使用新值。

Runtime configuration updates are written to Audit Log.

## Custom Definitions

`Refresh / Validate` is used to manually refresh and validate custom Module, Playbook, SIEM YAML, and custom Playbook Prompt.

After execution, the page displays:

- Number of loaded Modules, Playbooks, SIEM YAML, and Prompts.
- Name, source, and file path of each definition.
- File paths and exception information of loading failures.

This operation writes to Audit Log. Simple script definition or YAML changes can be confirmed through refresh/validate; if `custom\requirements.txt`、third-party Python packages, or common helper modules are changed, dependencies need to be reinstalled and related containers restarted.

## Usage Recommendations

- Chinese teams can set Prompt Language to `zh`，让调查和知识提取使用中文提示词。
- Stream Maxlen should be adjusted based on alert volume; the larger the alert volume, the retention length can适当增大。
- After modifying Runtime,建议从新的 Case 或新的 Webhook 告警开始观察效果。
