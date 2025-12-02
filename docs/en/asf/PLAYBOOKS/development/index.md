# Development Guide

Playbooks are used to execute **user-triggered** automated tasks.

For example, calling TI queries to update Artifact enrichment, analyzing alerts to generate suggestions, or performing threat hunting for Cases.

## Registering Playbook Scripts

- Create playbook script files in the `PLAYBOOKS` directory.
- Ensure the class name is `Playbook` and inherits from `BasePlaybook` or `LanggraphPlaybook`.
- Implement the `run` function, which the framework will automatically execute.
- **The recommended method is to copy an existing script and modify it as needed.**

## Calling Playbooks

- Call the playbook using a POST request to the `api/v1/automation/playbook` interface.
- In the POST Data, `playbook` is the playbook's file name, such as `Alert_Suggestion_Gen_By_LLM`.
- Other parameters are passed in according to playbook requirements, such as `worksheet` and `rowid`.
- The playbook code can use `self.param("parameter name")` to get the passed parameter values.

## Synchronous Execution

- After calling the interface, wait for the playbook to complete execution and return the result directly via the REST API Response.
- Refer to [TI_Artifact_query_by_AlienVaultOTX](../TI_Artifact_query_by_AlienVaultOTX/)

## Asynchronous Execution

- After calling the interface, a task ID is returned immediately. The playbook needs to handle the result response itself.
- Refer to [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM/)
- **SIRP only supports asynchronous playbook execution.**