# Framework

## Module Engine

- 告警流式处理模块 (前自动化)
- 提供多种模块模板及接口
- 加载/运行告警自动化模块

## Playbook Engine

- 自动化剧本功能 (后自动化)
- 提供多种剧本模板及接口
- 加载/运行自动化剧本

## Plugins

- 外部集成API (接口插件)
- 将外部工具接口封装成插件
- 按需调用,按需配置

## Webhook

### Splunk Alert Action

接收Splunk告警中Webhook Action发送的告警数据,格式化后存储于Redis Stack

### Kibana Alert Webhook

接收ELK告警中Webhook Connector发送的告警数据,格式化后存储于Redis Stack

## Redis Stack

- Redis Insight 用于图形化管理Redis Stream
- Redis Stream 用于根据告警(SIEM Alert)名称对告警进行队列存储