# Custom

Custom is ASP's management entry for custom extensions. It displays and validates the Module, Playbook, and SIEM YAML definitions loaded in the current runtime.

## Entry

Custom is located in the left navigation bar and is available only to administrators.

![Custom page](img.png)

> Image placeholder: show the Custom page with the Modules, Playbooks, and SIEM YAML tabs, plus the Modules detail drawer with Stream message inspection.

## Managed Objects

| Tab | Description |
| --- | --- |
| Modules | Shows loaded Modules, file path, Redis Stream, thread count, and basic Stream status. |
| Playbooks | Shows runnable Playbook Definitions, source, tags, description, and file path. |
| SIEM YAML | Shows SIEM index YAML files, backend type, field count, key field count, and field details. |

The Playbooks tab distinguishes `official` and `custom` sources. Modules and SIEM YAML do not have an official source concept, so they do not display a source field.

## Refresh / Validate

Each tab has its own `Refresh / Validate` action:

- Modules: rescans Module scripts and displays load errors.
- Playbooks: rescans built-in and custom Playbook scripts and displays load errors.
- SIEM YAML: rescans YAML files and refreshes the SIEM registry cache.

Manual `Refresh / Validate` writes to Audit Log. Opening the page and automatically loading current status does not write Audit Log entries.

## Module Stream Inspection

The Modules tab can inspect the Redis Stream linked to each Module:

- Whether the Stream exists.
- Stream length.
- First and last message IDs.
- Consumer group summary.
- Recent message JSON.
- Read a specific message by message ID.

This feature is read-only. It does not write to the Stream, consume messages, delete Streams, or trigger Module execution.

## Playbook

The Playbooks tab only displays Playbook Definitions. It does not run Playbooks from the Custom page. To test a Playbook, use `Run Playbook` from a Case page.

Prompt files are not Custom managed objects. A Playbook may keep prompts in code or call `self.read_prompt("System")` to read files; the Custom page does not validate whether prompt files exist.

## SIEM YAML

The SIEM YAML tab shows each YAML file's index name, backend type, description, field count, and field table. The field table includes field name, type, whether it is a key field, description, and sample values.

Create or update YAML through Claude Code / Skills or the code repository workflow. The Custom page only displays and validates definitions.

## Dependencies and Restarts

After changing only Module, Playbook, or SIEM YAML files, use `Refresh / Validate` in the corresponding tab to confirm load results.

If `custom\requirements.txt`, third-party Python packages, or common helper modules change, reinstall dependencies and restart related containers.
