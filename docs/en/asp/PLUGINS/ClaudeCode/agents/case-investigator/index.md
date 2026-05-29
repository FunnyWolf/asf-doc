# Case Investigator

An investigation orchestration Agent that starts from a Case and automatically selects the most valuable investigation path.

## Trigger Scenarios

- "Help me investigate this Case"
- "Is there enough evidence in this Case?"
- "What should I look at next?"

## Usage Examples

<!-- Screenshot + description -->

## Input

| Parameter | Description |
|------|------|
| Case ID / Description | The Case ID or a natural language description of the Case |

## Output

- `Case Understanding`: What the Case represents
- `Current Signals`: Known key facts
- `Useful Pivots`: Pivot directions worth pursuing
- `Evidence Gaps`: Information that still needs to be confirmed
- `Recommended Next Step`: 1-3 concrete actions

## Dependencies

Underlying calls: `asp-case-en/zh`, `asp-alert-en/zh`, `asp-artifact-en/zh`, `asp-siem-search-en/zh`, `asp-knowledge-en/zh`, `asp-enrichment-en/zh`, `asp-playbook-en/zh`
