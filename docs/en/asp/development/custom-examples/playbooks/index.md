# Custom Playbook Examples

This page introduces two custom Playbook examples from the source repository: Case Summary and CMDB Enrichment. They show how Playbooks continue investigation, enrichment, or field write-back after a Case exists.

> A Playbook is a Case-triggered automation task. To test a Playbook, click `Run Playbook` on a Case detail page and make sure the Playbook Worker is running.

## Example files

| Example | Source path | Purpose |
| --- | --- | --- |
| Case Summary | `backend/custom/playbooks/case_summary.py` | Calls an LLM to generate an analyst-facing summary and writes it back to the Case Summary field. |
| Case Summary Prompt | `backend/custom/data/playbooks/case_summary/System_zh.md` / `System_en.md` | Provides system prompts used by the Case Summary Playbook. |
| CMDB Enrichment | `backend/custom/playbooks/cmdb_enrichment.py` | Queries CMDB context for Artifacts linked to the Case and writes results to Enrichment. |

## Case Summary

`case_summary.py` summarizes current Case context into a concise analyst-facing summary.

Execution flow:

1. Read the current Case.
2. Serialize Case investigation context with `serialize_case_for_investigation()`.
3. Read `System_zh.md` or `System_en.md` according to Runtime Prompt Language.
4. Call the LLM to generate a 2-4 sentence summary.
5. Write the result back to the Case `summary` field.

Prompt paths:

```text
custom/data/playbooks/case_summary/System_zh.md
custom/data/playbooks/case_summary/System_en.md
```

Use cases:

- The Case already has Alert / Artifact / Enrichment / Audit Log context.
- Analysts want a quick editable summary.
- You want to demonstrate how a custom Playbook reads external prompt files.

## CMDB Enrichment

`cmdb_enrichment.py` enriches Case-linked Artifacts with asset or identity context.

Execution flow:

1. Iterate Artifacts under Alerts linked to the Case.
2. Deduplicate Artifacts and call the CMDB lookup interface.
3. Write supported results to Artifact Enrichment.
4. Return execution statistics such as alert count, artifact count, enriched count, and error count.

Use cases:

- The Case already contains host, IP, account, or domain Artifacts.
- Analysts need to understand the related asset, business system, owner, or criticality.
- You want to demonstrate how a custom Playbook writes external query results to Enrichment.

## Run and validate

1. Place Playbook files in `custom/playbooks/`.
2. If prompt files are used, place them in `custom/data/playbooks/<playbook_slug>/`.
3. Run `Refresh / Validate` in [Custom Console](../../custom-console/) → `Playbooks`.
4. Click `Run Playbook` on a Case detail page.
5. Start the Playbook Worker:

```bash
python manage.py run_agentic_playbook_worker
```

6. Check results:
   - Case Summary: check the Summary field in Case basic information.
   - CMDB Enrichment: check Enrichment for Artifacts linked to the Case.
   - Playbook record: check status and Remark.

## Copying to a Compose deployment

Source-to-deployment paths:

```text
backend/custom/playbooks/*.py                    -> custom/playbooks/
backend/custom/data/playbooks/<slug>/*.md        -> custom/data/playbooks/<slug>/
```

If a Playbook introduces new third-party dependencies, update `custom/requirements.txt` and reinstall dependencies.

## Related documentation

- [Custom Examples overview](../)
- [Playbook Development](../../playbook/)
- [Custom Console](../../custom-console/)
- [Custom Module Examples](../modules/)
