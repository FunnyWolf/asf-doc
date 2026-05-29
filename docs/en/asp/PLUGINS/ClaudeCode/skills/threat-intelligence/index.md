# Threat Intelligence

Query threat intelligence for IOCs (IP, hash, URL, domain) and assess risk levels.

## Trigger Scenarios

- Check if a specific IP/domain/hash is malicious
- Get risk scores, tags, and associated malware families for an IOC
- Supplement external intelligence context for an Artifact under investigation

## Usage Examples

![img.png](img.png)

## Input

| Parameter        | Description                                |
|-----------|-----------------------------------|
| indicator | IOC value (IP, hash, URL, domain)               |
| provider  | Specify intelligence source (e.g. `AlienVaultOTX`); queries all sources if left empty |

## Output

- `indicator`: IOC value and detected type
- `aggregated_risk_level`: Highest risk level across all sources
- Details per source: risk level, reputation score, tags, attack techniques, malware families, network context

## Dependencies

MCP tool: `ti_query`. Saving results requires `asp-enrichment-en/zh`.
