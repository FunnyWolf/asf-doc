# Custom Examples

Custom Examples explains how to use the source-tree custom examples. It is not a new extension mechanism; it groups examples into two parts: Custom Module and Custom Playbook.

> The release package `custom/` directory is an empty template by default and does not include these test examples. Use `backend/custom/` in the source repository as a local development reference. If you want to test examples in a Compose deployment, copy only the examples you need into the deployment `custom/` directory.

## Two example types

| Type | Source path | Focus |
| --- | --- | --- |
| [Custom Module Examples](modules/) | `backend/custom/modules/` | How four Module examples convert logs or raw alerts into Cases / Alerts / Artifacts. |
| [Custom Playbook Examples](playbooks/) | `backend/custom/playbooks/` | How two Playbooks write back Summary or add Enrichment on Cases. |

Common Custom Module flow:

```text
log / raw alert
  -> alert rule
  -> alert ingestion
  -> Redis Stream
  -> Custom Module
  -> Case / Alert / Artifact
```

Common Custom Playbook flow:

```text
Case
  -> Run Playbook
  -> Custom Playbook
  -> Summary / Enrichment / Remark
```

## Recommended reading order

1. [Custom Module Examples](modules/): See how four Module examples generate Cases from logs or raw alerts.
2. [Custom Playbook Examples](playbooks/): See how Playbooks write back Summary or add Enrichment after a Case exists.
3. [Custom Console](../custom-console/): Confirm at runtime whether Modules and Playbooks are loaded successfully.

## Copying to a Compose deployment

To test these examples in a Compose release package, copy selected files as needed:

```text
backend/custom/modules/*.py                 -> custom/modules/
backend/custom/playbooks/*.py               -> custom/playbooks/
backend/custom/data/siem/*.yaml             -> custom/data/siem/
backend/custom/data/modules/<slug>/*.json   -> custom/data/modules/<slug>/
backend/custom/data/playbooks/<slug>/*.md   -> custom/data/playbooks/<slug>/
```

After copying:

- Run `Refresh / Validate` for Modules / Playbooks / SIEM YAML in [Custom Console](../custom-console/).
- If new Python dependencies are added, update `custom/requirements.txt` and reinstall dependencies.
- To consume raw alerts automatically, run the Module Worker and make sure the Redis Stream name matches the Module `STREAM_NAME`.
