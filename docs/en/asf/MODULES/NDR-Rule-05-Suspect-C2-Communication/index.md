# NDR-Rule-05-Suspect-C2-Communication

- Demonstrates how to use an AI Agent to analyze a Case in SIRP.
- **By adjusting the AI Agent's prompts, this module can be migrated to other types of alerts (EDR/Cloud, etc.).**

## Module Architecture

- A single C2 communication alert from a host has a Medium severity level.
- When multiple C2 communication alerts from the same host occur within 1 hour, or when alerts appear regularly, the level is rapidly raised to Critical.

If a company wants to apply the above rules, it cannot be achieved by an AI Agent analyzing a single alert; it requires analyzing the aggregated Case data.