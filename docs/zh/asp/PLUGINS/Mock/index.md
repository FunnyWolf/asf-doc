# Mock 插件

在将 ASP 部署在生产环境前,通过该插件模拟 CMDB、SIEM、SIRP 三种数据源,测试 Agent 架构和数据流.

## CMDB

模拟企业 CMDB 资产查询接口,用于告警调查时获取资产上下文信息.

### 使用方法

```python
from PLUGINS.Mock.CMDB.CMDB import cmdb_instance

result = cmdb_instance.lookup(artifact_type, artifact_value)
```

### 支持的 Artifact 类型

| 类型 | 返回内容 |
|------|---------|
| `HOSTNAME` / `ENDPOINT` / `DEVICE` / `IP_ADDRESS` | 资产信息: IP、MAC、状态、环境、网络区域、责任人、已安装软件 |
| `USER_NAME` / `USER` / `ACCOUNT` | 身份信息: 用户ID、部门、职位、权限等级、关联终端 |
| `EMAIL_ADDRESS` / `EMAIL` | 邮箱 + 身份信息 |
| `PORT` | 端口暴露信息: 协议、常见服务、暴露等级 |
| `SUBNET` | 子网信息: CIDR、区域、资产数量 |
| `RESOURCE_UID` / `RESOURCE` | 云资源信息: 类型、云厂商、区域、状态 |
| `MAC_ADDRESS` / `SERIAL_NUMBER` | 资产信息 |

CMDB 基于 SHA-256 确定性哈希,相同输入始终返回相同结果.

## SIEM

生成网络流量、主机事件、AWS CloudTrail 三种模拟日志,支持发送到 ELK 和 Splunk.

### 配置方法

1. 拷贝 `PLUGINS/Mock/SIEM/CONFIG.example.py` 为 `CONFIG.py`
2. 设置 ELK 和 Splunk 的启用开关:

```python
ELK_ENABLED = True
SPLUNK_ENABLED = True
```

3. SIEM 凭据分别从 `PLUGINS/ELK/CONFIG` 和 `PLUGINS/Splunk/CONFIG` 读取

### 运行参数

在 `settings.py` 中配置:

| 参数 | 默认值 | 说明 |
|------|-------|------|
| `EPS` | 10 | 每秒生成事件数 |
| `BATCH_SIZE` | 100 | 批量发送大小 |
| `MALICIOUS_PERCENTAGE` | 0.05 | 恶意日志注入比例 (5%) |

### 日志生成器

| 生成器 | 索引名 | 说明 |
|--------|--------|------|
| `NetworkGenerator` | `siem-network-traffic` | 网络流量日志,含源/目的IP、端口、协议 |
| `HostGenerator` | `siem-host-events` | 主机事件日志,含进程创建、文件操作、注册表变更 |
| `CloudGenerator` | `siem-aws-cloudtrail` | AWS CloudTrail 日志,含 IAM、S3、EC2 等操作 |

### 攻击场景

每个生成器配有对应的攻击场景,以 5% 概率注入:

| 场景 | 关联生成器 | 说明 |
|------|-----------|------|
| `BruteForceScenario` | Network | 5-10 次 SSH/RDP 失败登录 + 1 次成功登录,攻击IP `45.95.11.22` |
| `RansomwareScenario` | Host | 三阶段: 删除卷影副本 → 20个文件加密重命名 → 勒索信文件创建 |
| `CloudPrivilegeEscalationScenario` | Cloud | 完整 AWS 杀伤链: 侦查 → 权限枚举 → 创建后门用户 → 权限提升 → AssumeRole |

### 运行

```bash
python PLUGINS/Mock/SIEM/main.py
```

生成的日志可与 [SIEM 插件](../SIEM/) 中的 `siem-network-traffic.yaml`、`siem-host-events.yaml`、`siem-aws-cloudtrail.yaml` 配置文件配合使用.

## SIRP

生成完整的 Case、Alert、Artifact、Enrichment 测试数据,数据之间自动关联.

### 创建 Mock 数据

```bash
python PLUGINS/Mock/SIRP/main.py
```

### 清理 Mock 数据

```bash
python PLUGINS/Mock/SIRP/delete_all.py
```

### Mock 数据概览

| 数据类型 | 数量 | 说明 |
|---------|------|------|
| Case | 13 | 覆盖钓鱼、横向移动、勒索软件、暴力破解、数据泄露、云配置错误等场景 |
| Alert | 16 | 含 MITRE ATT&CK 映射、数据源、修复建议,关联 SIEM 攻击场景 |
| Artifact | 37 | IOC 数据: IP、域名、哈希、进程、用户等,与 Enrichment 关联 |
| Enrichment | 24 | 多厂商情报: OTX、VirusTotal、AbuseIPDB、CrowdStrike、Shodan 等 |

开发人员可参考 `mock_case.py`、`mock_alert.py` 等文件理解 SIRP 数据模型的构建方式.
