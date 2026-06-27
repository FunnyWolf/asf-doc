# Artifact Investigator

Artifact Investigator is an investigation Agent主导 by IOC / Artifact, used to determine risk, context, and impact scope围绕一个实体。

## Trigger Scenarios

- Investigate a specific IP, domain, URL, file hash, account, host, or other entity.
- Determine whether an Artifact is malicious, belongs to internal assets, or appears in multiple alerts.
- Need to query threat intelligence, CMDB, SIEM, or associated Cases围绕 Artifact。

## How It Works

1. First use Artifact Skill to find entity records.
2. View associated Alerts, Cases, and Enrichments.
3. Query Threat Intelligence for IOC.
4. Query CMDB for asset or identity objects.
5. Use SIEM Search for timeline and scope verification when necessary.
6. After forming reusable conclusions, save Enrichment as needed.

## Output

- Artifact Summary
- Current Context
- Threat / Asset Signals
- Related Cases or Alerts
- Evidence Gaps
- Recommended Next Step

## Dependencies

- `asp-artifact`
- `asp-alert`
- `asp-case`
- `asp-enrichment`
- `asp-threat-intelligence`
- `asp-cmdb`
- `asp-siem-search`
- ASP MCP Server: `/api/mcp`
