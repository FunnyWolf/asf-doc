# SIEM Rule

SIEM Rule Skill 用于根据调查目标生成 Splunk SPL 或 ELK ES|QL 检测规则。

## 触发场景

- 用户需要把威胁假设转换成可运行的 SIEM 检测规则。
- 用户希望基于已知 schema 生成 SPL / ES|QL。
- 用户需要 MITRE ATT&CK 映射和验证建议。

## 输入

| 输入 | 说明 |
| --- | --- |
| SIEM 类型 | Splunk 或 ELK。 |
| 检测目标 | 行为、IOC、技术或攻击场景。 |
| Schema | 可用 index 和字段。 |
| 时间范围 | 用于验证规则。 |

## 输出

检测规则、字段假设、验证步骤、ATT&CK 映射和部署建议。

## 依赖

MCP 工具：`siem_explore_schema`、`siem_execute_spl`、`siem_execute_esql`。
