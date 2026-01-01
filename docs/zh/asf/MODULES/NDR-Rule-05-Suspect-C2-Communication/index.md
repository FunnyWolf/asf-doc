# NDR-Rule-05-Suspect-C2-Communication

- 展示如何使用AI Agent分析SIRP中的Case.
- **调整 AI Agent 提示词即可将该模块迁移到其他类型告警(EDR/Cloud等)**

## 模块架构

- 主机的一条 C2 通信告警级别为 Medium
- 当同一主机在1小时内出现多条C2通信告警时,或者有规律的出现告警时级别迅速提升到Critical.

如何企业希望应用以上规则,AI Agent 分析单独一条告警时无法实现的,需要分析聚合后的 Case 数据.
