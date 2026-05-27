# EDR-01-HOST-Vssadmin-Delete-Shadows

检测 Windows 主机上执行 `vssadmin delete shadows` 命令的行为,这是勒索软件加密前的典型操作.

- MITRE ATT&CK: **T1490 - Inhibit System Recovery**
- 展示 EDR 告警到 ASP Alert 的映射、进程相关 Artifact 提取和 Case 聚合

## 日志来源

日志来源于 [Mock 插件](../../PLUGINS/Mock/) 的 `HostGenerator`,生成模拟 EDR 主机日志.字段说明见 [siem-host-events.yaml](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/DATA/PLUGINS/SIEM/siem-host-events.yaml).

## 关键处理逻辑

- **字段提取**: 从原始告警中提取主机、用户、进程、父进程及哈希信息,支持扁平和嵌套两种 JSON 格式
- **Artifact**: 执行用户、受影响主机、进程哈希(SHA256/MD5)、完整命令行
- **聚合**: 按 `[主机名, 用户名]` 在 24h 内聚合为同一 Case
- **严重程度**: 默认处置为 DETECTED(卷影副本删除是勒索软件强指标);风险评分 >=90 Critical, >=70 High, >=40 Medium
- **缓解措施**: 通过 AppLocker/WDAC 限制 vssadmin.exe,监控卷影副本删除,维护离线备份
