# SIRP 插件

SIRP（Security Incident Response Platform）是平台的事件响应中枢，基于 Nocoly HAP 实现，提供 Case、Alert、Artifact、Enrichment、Playbook、Knowledge 六类实体的统一管理。

## 部署

[SIRP 安装指南](../../../sirp/Deploy/sirp_install/index.md)

## 配置方法

1. 将 `PLUGINS/SIRP/CONFIG.example.py` 重命名为 `CONFIG.py`
2. 填写配置项：

| 配置项                   | 说明                                                                             |
|-----------------------|--------------------------------------------------------------------------------|
| `SIRP_URL`            | SIRP 平台地址，如 `http://192.168.241.128:8880`（私有部署）或 `https://www.nocoly.com`（云服务） |
| `SIRP_APPKEY`         | 应用密钥，从 SIRP 应用管理页面获取                                                           |
| `SIRP_SIGN`           | 应用签名，从 SIRP 应用管理页面获取                                                           |
| `SIRP_NOTICE_WEBHOOK` | 通知 Webhook 地址，用于向用户推送消息                                                        |

![img_11.png](img_11.png) ![img_12.png](img_12.png)

![img.png](img.png) ![img_1.png](img_1.png) ![img_2.png](img_2.png)

## 核心实体

### 实体关系

```
Case ──┬── Alert ──┬── Artifact ── Enrichment
       │           └── Enrichment
       └── Enrichment
```

- **Case：** 安全案件，聚合多个 Alert，是分析师和 AI 分析处理的核心对象
- **Alert：** 告警，映射 SIEM Rule 产生的告警，包含 MITRE ATT&CK 映射、风险等级、修复建议等。一个 Alert 只能挂载到一个 Case
- **Artifact：** 从告警中提取的实体（IOC），如 IP、域名、哈希、用户等。一个 Artifact 可挂载到多个 Alert（多对多关系）
- **Enrichment：** 富化数据，可挂载到 Case/Alert/Artifact 任意一级，补充威胁情报、CMDB、地理信息等上下文
- **Playbook：** 响应剧本执行记录，关联到 Case，跟踪执行状态和结果
- **Knowledge：** 知识库，供 AI 和分析师查询的内部安全知识记录，支持从已关闭 Case 中自动提取

### 关键能力

**通用 CRUD**
所有实体支持 get/list/create/update/update_or_create/batch_update_or_create，支持按 row_id 或业务 ID 查询，支持结构化过滤条件。

**关联数据自动加载**
Case 加载时自动级联加载关联的 Alert 列表（含 Artifact 和 Enrichment），Alert 加载时自动级联加载 Artifact 和 Enrichment，无需手动 join。

**自动去重**

- Artifact：按 name + type + role + value 复合键去重，创建时若已存在则返回已有 row_id
- Enrichment：按 uid（外部计算的稳定标识）或 type + provider + value 去重，已存在则更新
- Artifact 值自动归一化（邮箱/哈希/主机名转小写，MAC 地址格式标准化）

**Case AI 分析调度**
Case 支持通过 `mark_analysis_requested()` 触发自动化 AI 分析，基于 Redis Stream 实现冷却期调度（默认 10 分钟），支持防抖和首次请求优先。

**AI 评估与人工评估分离**
Case 同时维护人工评估字段（`severity`/`confidence`/`verdict`）和 AI 评估字段（`severity_ai`/`confidence_ai`/`verdict_ai`），互不覆盖。

**AI 调查报告**
Case 的 `investigation_report_ai_json` 字段存储 LLM 生成的结构化调查报告，包含判决、攻击链、时间线、IOC、修复建议等。

**讨论记录**
Case 和 Alert 支持讨论/评论线程，通过 `get_discussions()` 获取。

**Playbook 执行管理**
Playbook 支持创建待执行记录、跟踪执行状态（Pending/Running/Success/Failed），通过 Case ID 关联触发。

**Knowledge 搜索**
Knowledge 支持按关键词列表搜索未过期的知识记录（匹配标题或正文），返回格式化结果供 AI 消费。

**通知推送**
Notice 支持通过 Webhook 向指定用户发送通知消息.

**AI 序列化**
所有实体支持 `model_dump_for_ai(profile=...)` 方法，按 profile（如 "mcp"、"investigation"）过滤字段，生成适合 LLM 消费的精简 JSON。
