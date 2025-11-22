# Development Guide

A Playbook is used to execute **user-triggered** automated tasks.

For example, calling a TI query to update an Artifact's enrichment, or analyzing an Alert to generate a Suggestion.

## Registering a Playbook Script

- Create a playbook script file in the `PLAYBOOKS` directory.
- Ensure the class name in the file is `Playbook` and that it inherits from `BasePlaybook` or `LanggraphPlaybook`.
- Implement the `run` function; the framework will execute this function automatically.
- **The recommended method is to copy an existing script and modify it according to your needs.**

## Calling a Playbook

- A playbook is called via a POST request to the `api/v1/automation/playbook` endpoint.
- In the POST Data, `playbook` is the file name of the playbook, for example, `Alert_Suggestion_Gen_By_LLM`.
- Other parameters are passed in according to the playbook's requirements, such as `worksheet` and `rowid`.
- In the playbook code, you can use `self.param("parameter_name")` to get the value of the passed-in parameter.

## Synchronous Execution

- After calling the interface, it waits for the playbook to complete and returns the result directly through the REST API's Response.
- Refer to [TI_Artifact_query_by_AlienVaultOTX](../TI_Artifact_query_by_AlienVaultOTX) for an example.

## Asynchronous Execution

- After calling the interface, it immediately returns a task ID. The playbook needs to handle the result response itself.
- Refer to [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM) for an example.
- **Only asynchronous execution of playbooks is supported in SIRP.**

## SIRP Playbook

- For the method of developing a SIRP playbook, refer to [Alert_Suggestion_Gen_By_LLM](../Alert_Suggestion_Gen_By_LLM).