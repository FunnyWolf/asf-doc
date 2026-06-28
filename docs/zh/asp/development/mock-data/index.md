# Mock 数据

Mock 数据用于在没有真实告警源时体验 ASP 工作台、验证 Module / Playbook 流程，或向 SIEM 写入模拟日志。

> SIEM Mock 日志可以和 [告警接入](../alert-ingestion/)、[Custom Examples](../custom-examples/) 中的示例 SIEM YAML、Splunk SPL / ELK ES|QL 查询和 Module 配合，用于演示从日志到 Case 的完整链路。

当前后端提供两类 Mock：

| 类型 | 位置 | 用途 |
| --- | --- | --- |
| ASP 工作台 Mock 数据 | `backend\mock\import_mock_data.py` | 直接向 ASP 数据库写入 Case、Alert、Artifact、Enrichment、Knowledge 和 Playbook 示例。 |
| SIEM Mock 日志 | `backend\mock\siem\` | 生成网络、主机、云日志，并发送到 ELK 或 Splunk。 |

## 导入 ASP 工作台 Mock 数据

在 `backend` 目录执行：

```powershell
.\.venv\Scripts\python.exe manage.py shell -c "from mock.import_mock_data import run; run()"
```

该脚本可以重复运行。每次运行都会创建一个新的 mock batch，不会覆盖或清理历史 mock 数据。

导入后可以在工作台中看到：

- 多个不同分类的 Case，例如 EDR、IAM、NDR、Email、DLP、WAF、Proxy、Threat Intelligence。
- 关联 Alert。
- Artifact。
- Enrichment。
- Knowledge。
- Playbook 运行记录。

Case 会包含拟真的 TTD、TTA、TTR 时间线信息，并覆盖 New、In Progress、On Hold、Resolved、Closed 等状态。

脚本会创建以下示例用户，密码均为 `mockpass`：

| 用户 | 说明 |
| --- | --- |
| `alice.chen` | 分析师示例用户。 |
| `bob.li` | 分析师示例用户。 |
| `maya.singh` | 分析师示例用户。 |
| `automation` | 自动化操作示例用户。 |

## 生成 SIEM Mock 日志

SIEM Mock 用于向 ELK 或 Splunk 写入模拟日志。它会持续生成三类索引数据：

| 索引 | 场景 |
| --- | --- |
| `siem-network-traffic` | 网络流量和暴力破解场景。 |
| `siem-host-events` | 主机事件和勒索行为场景。 |
| `siem-aws-cloudtrail` | 云日志和权限提升场景。 |

先复制并编辑配置：

```powershell
Copy-Item .\mock\siem\.env.example .\mock\siem\.env
```

`.env` 示例：

```text
MOCK_SIEM_ELK_ENABLED=true
MOCK_SIEM_ELK_HOST=http://localhost:9200
MOCK_SIEM_ELK_KEY=replace-me

MOCK_SIEM_SPLUNK_ENABLED=true
MOCK_SIEM_SPLUNK_HEC_URL=http://localhost:8088/services/collector
MOCK_SIEM_SPLUNK_TOKEN=replace-me
```

启动生成器：

```powershell
.\.venv\Scripts\python.exe -m mock.siem.main
```

生成器会按配置把日志批量发送到 ELK `_bulk` 或 Splunk HEC。

## 运行参数

SIEM Mock 的基础运行参数在 `backend\mock\siem\settings.py` 中：

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `EPS` | `10` | 每秒事件数量。 |
| `BATCH_SIZE` | `100` | 每批生成数量。 |
| `MALICIOUS_PERCENTAGE` | `0.05` | 注入异常场景的概率。 |

## 使用建议

- 想快速体验工作台：先导入 ASP 工作台 Mock 数据。
- 想验证 SIEM 查询、SIEM YAML、Module 或告警接入：使用 SIEM Mock 日志。
- SIEM Mock 会持续发送数据，测试结束后记得停止进程。
- 不要在生产环境导入 Mock 数据或运行 Mock 日志生成器。
