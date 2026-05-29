# Threat Intelligence Enrichment

Perform threat intelligence enrichment on all Artifacts associated with a Case. Query results from AlienVault OTX are written as Enrichment records to the corresponding Artifacts.

## Registered Name

`Threat Intelligence Enrichment`

## Execution Flow

1. Load complete Case data (including associated Alerts and Artifacts)
2. Collect all Artifacts and deduplicate (by row_id)
3. Query AlienVault OTX one by one via `TIToolKit.query()`
4. Create/update the query results as Enrichment records on the Artifact (including reputation scores, pulse information, etc.)
5. Output statistics: alert count, Artifact count, enrichment success/failure count

## Trigger Methods

- Manually execute Playbook from the SIRP platform Case detail page
- Trigger via MCP tool `execute_playbook`
