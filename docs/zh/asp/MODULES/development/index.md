# 开发指南

ASF的模块用于 **自动化** 流式处理告警数据, 模块将原始告警转换成 SIRP 平台中用户可读的 Case / Alert / Artifact.

- Case 为用户可操作的对象,多个 Alert 可以根据规则聚合为一个 Case.  [Case](../../../sirp/Feature/case/index.md)

- Alert 提供标准化的告警格式. [Alert](../../../sirp/Feature/alert/index.md)

- Artifact 为最小数据单元,储存实体信息. [Artifact](../../../sirp/Feature/artifact/index.md)

所有模块代码均位于 `MODULES` 目录下.

## 数据流

NDR/EDR/XDR/.. ⇒ SIEM ⇒ Rule ⇒ Webhook ⇒ Forwarder ⇒ Redis Stream ⇒ Module ⇒ SIRP (Case/Alert/Artifact)

**生产环境**中无需编码,通过在 SIEM 平台中配置 Action (Webhook Action 或 Index Action) 即可将告警数据导入Redis Stream 消息队列.

用户开发的自定义模块来流式处理队列中每一条告警,每个模块对应处理 Redis Stream 一个消息队列.

原始日志 (一千万/Day) => SIEM Rule => 原始告警 (1千条/天) => 模块处理 => **Case (10个/天)** / Alert (1千个/天) / Artifact (1万个/天)

整体处理过程中未丢失任何关键信息,用户和 AI Agent 只需要处理 10 个聚合后的 Case.