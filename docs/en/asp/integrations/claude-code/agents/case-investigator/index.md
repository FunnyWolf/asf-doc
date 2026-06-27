# Case Investigator

Case Investigator is an investigation orchestration Agent主导 by Case, used to understand, triage, and advance a security case.

## Trigger Scenarios

- Investigate, review, or summarize a Case.
- Determine whether current evidence in a Case is sufficient.
- Perform controlled drill-down based on Case-associated Alerts, Artifacts, SIEM, Knowledge, Enrichments, Comments, CMDB, and Playbooks.

## How It Works

1. First read the Case main view to understand status, risk, AI report, comments, and timeline.
2. Only supplement Alert or Artifact context when Case information is insufficient.
3. Only query SIEM when verification of scope, timeline, or prevalence is needed.
4. Only query Knowledge when internal experience may influence judgment.
5. After forming stable conclusions, recommend saving Enrichment or executing Playbook as needed.

## Output

- Case Understanding
- Current Signals
- Useful Pivots
- Evidence Gaps or SIEM Needs
- Knowledge or Reuse Clues
- Recommended Next Step

## Dependencies

- `asp-case`
- `asp-alert`
- `asp-artifact`
- `asp-siem-search`
- `asp-knowledge`
- `asp-enrichment`
- `asp-comment`
- `asp-cmdb`
- `asp-playbook`
- ASP MCP Server: `/api/mcp`
