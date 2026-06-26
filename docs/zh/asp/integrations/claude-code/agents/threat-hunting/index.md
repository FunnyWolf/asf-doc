# Threat Hunting

Threat Hunting Agent 用于假设驱动的主动威胁猎杀。

## 触发场景

- 用户提出一个威胁假设，希望在 SIEM 和 ASP 数据中验证。
- 用户希望围绕某类攻击技术、IOC、资产或行为进行狩猎。
- 用户需要把搜索过程、证据、可见性缺口和建议沉淀为报告。

## 工作方式

1. 形成清晰假设。
2. 探索可用 SIEM schema 和 ASP 上下文。
3. 用关键词搜索、结构化查询、SPL 或 ES|QL 验证。
4. 根据结果横向扩展到相关 IOC、Case、Alert、Artifact。
5. 收敛证据，明确命中、未命中和可见性缺口。

## 输出

- 结论
- 假设
- 过程
- 发现
- ATT&CK 映射
- 可见性缺口
- 建议
- 规则

## 依赖

- `asp-siem-search`
- `asp-siem-rule`
- `asp-alert`
- `asp-artifact`
- `asp-case`
- `asp-threat-intelligence`
- `asp-knowledge`
- ASP MCP Server：`/api/mcp`
