# Tags

Tags 是 System Settings 中的只读预览页，用于集中查看前端当前使用的 Tag 字段、枚举值和颜色效果。

## 入口

Tags 位于 System Settings 的 `Tags` Tab，只有管理员可以访问。

![Tags 页面](img.png)

## 页面内容

Tags 页面按业务区域展示前端常见 Tag：

- Cases：Category、Severity、Confidence、Impact、Priority、Verdict 等。
- Alerts：Severity、Risk Level、Disposition、Action、Product Category、Analytic Type 等。
- Artifacts / Enrichments：Artifact Type、Artifact Role、Enrichment Type、Provider 等。
- Knowledge / Playbooks / Users / Settings：Knowledge Source、Playbook Tags、User Role、LLM Provider Tags 等。
- Custom Console / System UI：SIEM Backend、Audit Action、Inbox Kind 等。

该页面不修改数据，也不保存配置。它的目标是让管理员和开发者不用专门构造测试数据，就能检查字段枚举和颜色是否统一。

## 风险等级色阶

Severity、Confidence、Impact、Priority 和 Risk Level 当前使用统一的风险色阶：

| 等级 | 颜色 |
| --- | --- |
| Critical | red |
| High | volcano |
| Medium | gold |
| Low | cyan |
| Info / Informational | blue |
| Unknown / Other | default |
