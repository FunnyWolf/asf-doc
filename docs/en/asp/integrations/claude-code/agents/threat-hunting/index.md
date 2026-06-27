# Threat Hunting

Threat Hunting Agent is used for hypothesis-driven proactive threat hunting.

## Trigger Scenarios

- User提出一个威胁假设，希望在 SIEM 和 ASP 数据中验证。
- User希望围绕某类攻击技术、IOC、资产或行为进行狩猎。
- User需要把搜索过程、证据、可见性缺口和建议沉淀为报告。

## How It Works

1. Form a clear hypothesis.
2. Explore available SIEM schema and ASP context.
3. Verify with keyword search, structured queries, SPL, or ES|QL.
4. Based on results, laterally expand to related IOC, Cases, Alerts, Artifacts.
5. Converge evidence,明确命中、未命中和可见性缺口。

## Output

- Conclusion
- Hypothesis
- Process
- Findings
- ATT&CK Mapping
- Visibility Gaps
- Recommendations
- Rules

## Dependencies

- `asp-siem-search`
- `asp-siem-rule`
- `asp-alert`
- `asp-artifact`
- `asp-case`
- `asp-threat-intelligence`
- `asp-knowledge`
- ASP MCP Server: `/api/mcp`
