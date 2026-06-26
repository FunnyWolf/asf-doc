# 威胁情报

当前内置 AlienVault OTX 配置。

## 配置项

- Enabled
- API Key
- Base URL
- Proxy
- Timeout Seconds

启用后，Playbook 或富化流程可以查询 IOC，并把结果写入 Enrichment。

## 使用建议

- 先使用测试功能确认 API Key 和网络可用。
- 对代理环境配置 Proxy。
- 控制 Timeout，避免外部服务影响调查流程。
