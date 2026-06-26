# SIEM

ASP 当前提供 Splunk 和 ELK 配置。

## Splunk

配置项：

- Host
- Port
- Username
- Password
- Scheme
- Verify

配置完成后可以使用测试功能验证连接。

## ELK

配置项：

- Host
- API Key
- Verify Certs
- Request Timeout Seconds
- Process Alert From Index Enabled
- Action Index
- Action Poll Interval Seconds
- Action Size

ELK 可用于从指定索引轮询告警，也可配合 Webhook 接入。
