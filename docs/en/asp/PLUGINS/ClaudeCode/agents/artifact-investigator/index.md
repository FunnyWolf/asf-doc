# Artifact Investigator

An investigation orchestration Agent that starts from an IOC / Artifact, looking up SIEM frequency distributions, Knowledge context, and parent-level associations.

## Trigger Scenarios

- "Investigate this IP / domain / hash"
- "Where has this IOC appeared?"
- "What associations exist behind this Artifact?"

## Usage Examples

<!-- Screenshot + description -->

## Input

| Parameter | Description |
|------|------|
| IOC value / Artifact ID | IP, domain, hash, URL, etc., or the ID of an existing Artifact |

## Output

- `Artifact Understanding`: What this IOC is and why it matters
- `Known Context`: Existing records in the platform
- `Best Pivots`: 1-3 most valuable pivots
- `Evidence Gaps`: Information that still needs to be confirmed
- `Recommended Next Step`: 1-3 concrete actions

## Dependencies

Underlying calls: `asp-artifact-en/zh`, `asp-siem-search-en/zh`, `asp-knowledge-en/zh`, `asp-enrichment-en/zh`, `asp-alert-en/zh`, `asp-case-en/zh`, `asp-playbook-en/zh`
