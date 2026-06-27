# SIEM Rule

SIEM Rule Skill is used to generate Splunk SPL or ELK ES|QL detection rules based on investigation objectives.

## Trigger Scenarios

- User needs to convert threat hypotheses into runnable SIEM detection rules.
- User希望基于已知 schema 生成 SPL / ES|QL。
- User需要 MITRE ATT&CK 映射和验证建议。

## Input

| Input | Description |
|-------|-------------|
| SIEM type | Splunk or ELK. |
| Detection target | Behavior, IOC, technique, or attack scenario. |
| Schema | Available indexes and fields. |
| Time range | Used to verify rules. |

## Output

Detection rules, field hypotheses, verification steps, ATT&CK mapping, and deployment recommendations.

## Dependencies

MCP tools: `siem_explore_schema`、`siem_execute_spl`、`siem_execute_esql`.
