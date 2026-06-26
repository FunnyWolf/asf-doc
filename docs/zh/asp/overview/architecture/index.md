# 产品架构

ASP 的核心是“接入层 + 资源层 + 自动化层 + 交互层”的组合：外部告警进入平台后，被转换为 Case / Alert / Artifact 等统一资源，再由 Playbook、LLM 和 Harness Agent 推动调查、富化和知识沉淀。

## 架构图

![ASP 产品架构](arch.jpg)

## 主要组成

| 组成 | 说明 |
| --- | --- |
| 接入层 | 从 SIEM、Webhook、Splunk、Kibana 等来源接收告警和日志上下文。 |
| 资源层 | 以 Case、Alert、Artifact、Enrichment、Knowledge、Playbook 为核心资源，形成统一安全工作流。 |
| 自动化层 | Module 负责流式处理告警，Playbook 负责用户触发的自动化任务，LLM 负责生成调查分析。 |
| 交互层 | 前端工作台提供 Dashboard、列表、详情、设置、通知、Comments 和 Timeline；Harness Agent 通过插件进入同一套能力。 |
| 配置中心 | 管理 LLM Provider、SIEM、AlienVault OTX、LDAP、Agentic Runtime 等运行配置。 |

## 告警处理数据流

```text
NDR / EDR / XDR / Cloud
  → SIEM Rule
  → Webhook / Stream
  → Module 流式处理
  → Case / Alert / Artifact
  → AI Analysis / Enrichment / Playbook
  → Knowledge / Response Decision
```

Module 的职责不是简单搬运日志，而是提取 IOC、映射字段、关联聚合，并把原始告警压缩为分析师可以处置的 Case。处理过程中保留 Alert 和 Artifact 作为证据上下文，避免降噪后丢失关键信息。

## 后台任务模型

ASP 的后台能力可以理解为三类任务：

| 任务 | 作用 |
| --- | --- |
| Module 运行 | 持续消费告警消息，生成或更新 Case、Alert、Artifact。 |
| Playbook 执行 | 发现待执行的 Playbook 记录，运行调查、知识提取、威胁情报富化、CMDB 富化等任务。 |
| AI Analysis | 在 Case 创建或更新后调度 LLM 分析，生成调查报告和风险建议。 |

这三类任务共同把“告警进入平台”变成“案件被分析、富化、沉淀并进入处置决策”。

## Case War Room 与时间线

Case 是 ASP 中的用户操作主体，不只是一个工单容器。它更接近 SOAR 中的作战室：分析师在 Case 中查看证据、分配责任、更新状态、触发 Playbook，并通过 Comments 进行讨论和补充上下文。

这些协作内容不是附属信息。Comments 会作为 Case 调查上下文的一部分被 LLM 参考，用于理解分析师已经确认、否定或补充的线索。Case Log / Timeline 则记录状态变化、字段更新、关联资源变化和关键操作顺序，帮助还原事件处理过程，并为后续报告生成和时间线分析提供依据。

因此，一个 Case 的分析上下文不只包括 Alert、Artifact 和 Enrichment，也包括人的判断、讨论和操作轨迹。ASP 的目标是把机器生成的证据和人的处置过程放在同一个调查闭环里。

## 典型工作流

1. Splunk / Kibana 通过 Webhook 发送告警到 ASP。
2. Module 提取关键字段和 IOC，按关联规则生成或更新 Case。
3. Alert 保留检测上下文，Artifact 汇聚 IP、域名、账号、主机、文件等实体。
4. LLM 生成调查报告，Enrichment 补充威胁情报、资产、身份和历史上下文。
5. 分析师在 Case 作战室中讨论线索、补充判断、调整状态，并通过 Timeline 保留操作轨迹。
6. 分析师必要时触发 Playbook 推进调查或处置。
7. Playbook 结果写回 Case、Knowledge 或 Enrichment。
8. Comments、Timeline 和资源上下文共同支持后续 LLM 分析、报告生成和知识提取。

## API 路径约定

当前后端统一使用 `/api/` 作为父路径。各应用在子路由内声明资源路径，例如 `/api/cases/`、`/api/settings/`、`/api/webhook/splunk/`。
