# Threat Hunting

A hypothesis-driven threat hunting orchestration Agent that outputs a structured report after up to 3 rounds of iterative investigation.

## Trigger Scenarios

- "Has this host been compromised?"
- "Check for signs of lateral movement"
- "Perform threat hunting on this Case"

## Usage Examples

<!-- Screenshot + description -->

## Input

| Parameter | Description |
|------|------|
| Case ID / Hunting objective | The Case ID or a description of the hypothesis to validate |

## How It Works

Each iteration: OBSERVE (current state) → PLAN (1-3 questions) → ACT (call tools) → ASSESS (is it enough?), up to 3 rounds.

## Output

Threat Hunting Report:

- `Verdict`: Compromised / Suspicious / Benign
- `Confidence`: High / Medium / Low
- `Investigation Process`: Investigation process and reasoning
- `Key Findings & Evidence`: Findings and evidence
- `IOCs`: Extracted IOC list
- `Recommendations`: Recommended actions

## Dependencies

Underlying calls: `asp-siem-search-en/zh`, `asp-case-en/zh`, `asp-artifact-en/zh`, `asp-enrichment-en/zh`
