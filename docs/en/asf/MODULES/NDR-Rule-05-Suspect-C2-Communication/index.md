# NDR-Rule-05-Suspect-C2-Communication

This module demonstrates how to use an AI Agent to analyze a Case in SIRP.

- A single C2 communication alert from a host is classified as Medium severity.
- When multiple C2 communication alerts from the same host occur within 1 hour, or when alerts appear regularly, the severity level is rapidly escalated to Critical.

If an enterprise wants to apply the above rules, it cannot be achieved by an AI Agent analyzing a single alert; it requires analyzing the aggregated Case data.
