# ES-Rule-22-Phishing-User-Report-Mail

- An AI Agent built with Dify, including three nodes: `alert preprocessing`, `LLM analysis`, and `result output`.
- The module is used to analyze phishing email samples reported by end-users, determine whether the email is a phishing email, its confidence level, the analysis process, and send the results to SIRP.

- **It is not recommended to use Dify to build modules in a production environment; it should only be used for debugging prompts during development.**

## Module Architecture

- The `alert_preprocess_node` function shows how to read alerts from the Redis Stream queue and perform simple data processing.
- The `alert_analyze_node` function shows how to call the Dify App REST API and format the output results.
- The `alert_output_node` function shows how to use custom aggregation rules and how to send the analysis results to SIRP.
