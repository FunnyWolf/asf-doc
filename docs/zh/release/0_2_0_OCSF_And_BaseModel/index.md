# 0.2.0 - OCSF 和 BaseModel

## 新功能亮点

- [Case](../../asp/feature/case/index.md) 基于 [OCSF Incident Finding](https://schema.ocsf.io/1.7.0/classes/incident_finding) 标准进行重构，提供统一的事件调查和响应数据结构。
- [Alert](../../asp/feature/alert/index.md) 基于 [OCSF Detection Finding](https://schema.ocsf.io/1.7.0/classes/detection_finding) 标准进行重构，提供统一的告警数据结构。
- 新增 [Enrichment](../../asp/feature/enrichment/index.md) 模块，用于存储丰富化数据（Ticket 模块已废弃）

## 优化

- 重构 SIRP 的插件代码，使用 BaseModel 并更新 API，提升代码一致性和可维护性。

## 开发者笔记

新版本 SIRP 平台的 Case 和 Alert 模块均基于 OCSF 标准进行重构，好处有以下几点：

1. 统一的数据结构：OCSF 提供了一个统一的框架，使得不同安全工具和平台之间的数据交换变得更加容易。
2. 字段丰富：OCSF 标准定义了丰富的字段，覆盖了大部分安全事件和告警的关键信息，有助于提升数据的完整性。用户基本上不需要再自定义字段。
3. 生态系统支持：采用 OCSF 标准使得 SIRP 更容易与其他支持 OCSF 的工具和平台集成，扩展了 SIRP 的应用场景。

ASP 的插件代码重构为 BaseModel，主要目的是提升代码的一致性和可维护性。拥有更好的 IDE 提示和类型检查，减少运行时错误。