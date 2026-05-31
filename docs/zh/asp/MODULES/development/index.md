# 模块开发指南

模块用于 **自动化** 流式处理告警数据，将 SIEM 原始告警转换为 SIRP
中用户可读的 [Case](../../../sirp/Feature/case/index.md)/[Alert](../../../sirp/Feature/alert/index.md)/[Artifact](../../../sirp/Feature/artifact/index.md)。

## 数据流

```
NDR/EDR/XDR → SIEM → Rule → Webhook → Forwarder → Redis Stream → Module → SIRP
```

- **生产环境**无需编码，在 SIEM 中配置 Webhook Action 或 Index Action 即可将告警导入 Redis Stream
- 每个模块对应处理一个 Redis Stream 消息队列
- 模块名称即为 Stream 名称

### 数据降噪效果

| 阶段             | 数据量(示例)   |
|----------------|-----------|
| 原始日志           | 1000万/天   |
| SIEM Rule 触发告警 | 1000条/天   |
| 模块处理后 **Case** | **10个/天** |

处理过程中未丢失关键信息，AI Agent 和分析师只需处理聚合后的 Case。

## 模块结构

每个模块是 `MODULES/` 目录下的一个 Python 文件，文件名即模块名：

```
MODULES/
├── EDR-01-HOST-Vssadmin-Delete-Shadows.py
├── Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy.py
└── Mail-01-User-Report-Phishing-Mail.py
```

### 基本框架

```python
from Lib.basemodule import BaseModule
from PLUGINS.SIRP.sirpapi import Alert, Case
from PLUGINS.SIRP.sirpcoremodel import AlertModel, CaseModel, ArtifactModel

class Module(BaseModule):
    def __init__(self):
        super().__init__()

    def run(self):
        # 1. 从 Redis Stream 读取原始告警
        raw_alert = self.read_stream_message()

        # 2. 字段提取和数据映射
        # ...

        # 3. 构建 Artifact 列表(IOC)
        # artifacts = [ArtifactModel(...)]

        # 4. 关联聚合
        # correlation_uid = Correlation.generate_correlation_uid(...)

        # 5. 创建 Alert 和 Case
        # alert_model = AlertModel(...)
        # saved_alert_row_id = Alert.create(alert_model)
        # Case.create(CaseModel(..., alerts=[saved_alert_row_id]))
        # Case.mark_analysis_requested(row_id=case_row_id, cooldown_minutes=3)
```

### 模块处理步骤

1. **字段提取** — 从原始 JSON 中提取关键字段，处理扁平/嵌套两种格式
2. **Artifact 提取** — 提取 IOC（用户、主机、IP、哈希等），标注类型和角色
3. **关联聚合** — 通过 `Correlation.generate_correlation_uid()` 按规则和时间窗口聚合，相同 `correlation_uid` 的告警关联到同一个 Case
4. **构建 Alert** — 填充 MITRE ATT&CK 映射、严重程度、产品信息等
5. **Case 处理** — 按 `correlation_uid` 查找已有 Case，存在则追加 Alert，否则新建 Case；完成后调用 `Case.mark_analysis_requested()` 触发自动化分析

### Claude Code Skill

[Module Creator](../../PLUGINS/ClaudeCode/skills/module-creator/) Skill 辅助开发人员快速开发 Module。