# Module List

All module code is located in the `MODULES` directory.

### [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/)

- An AI Agent built with Langgraph, including three Langgraph Nodes: `Alert Preprocessing`, `LLM Analysis`, and `Result Output`.
- The module is used to analyze phishing email samples reported by end-users, determine if the email is a phishing email, its confidence level, the analysis process, and send the results to SIRP.
- **It is recommended to refer to this module's code when developing Langgraph-type modules.**

### [ES-Rule-22-Phishing_user_report_mail](../ES-Rule-22-Phishing_user_report_mail/)

- An AI Agent built with Dify, including three nodes: `Alert Preprocessing`, `LLM Analysis`, and `Result Output`.
- The module is used to analyze phishing email samples reported by end-users, determine if the email is a phishing email, its confidence level, the analysis process, and send the results to SIRP.

- **It is not recommended to build modules with Dify in a production environment; it should only be used for debugging prompts during development.**

### [NDR-Rule-05-Suspect-C2-Communication](../NDR-Rule-05-Suspect-C2-Communication/)

- Demonstrates how to use an AI Agent to analyze Cases in SIRP.
- **By adjusting the AI Agent's prompts, this module can be migrated to other types of alerts (EDR/Cloud, etc.).**