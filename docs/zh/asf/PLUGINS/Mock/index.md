# Mock 插件

在将 ASP 部署在生产环境前,建议通过该插件测试 Agent 的架构和数据流.

## CMDB

模拟企业CMDB API接口

## SIEM

- 生成 `siem-network-traffic` `siem-host-events` `siem-aws-cloudtrail` 三种测试日志
- 支持 `ELK` 及 `Splunk` 两种 SIEM
- 生成的测试数据可与 SIEM 插件中 `siem-network-traffic.yaml` `siem-host-events.yaml` `siem-aws-cloudtrail.yaml` 配置文件配合使用

#### 配置方法

- 拷贝 CONFIG.example.py 为 CONFIG.py
- 修改 CONFIG.py 中的配置项
- 默认 EPS 为 10, 可根据需要在 settings.py 中修改
- 运行 main.py 即可开始生成日志

## SIRP

- 生成完整的 `Case` `Alert` `Artifact` `Enrichment` `Ticket` 测试数据, 数据自动关联
- 开发人员可参考 `mock_*.py` 构建新的 Mock 数据或理解如何使用 SIRP API
- 运行 main.py 即可开始生成日志