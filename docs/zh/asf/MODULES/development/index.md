# 开发文档

ASF的模块用于流式处理告警数据,每个模块对应 Redis Stream 一个消息队列,模块每次运行处理一条队列中的告警.

## 告警导入

NDR/EDR/XDR/.. ==> SIEM ==> Alert Rule ==> Webhook ==> ASF Webhook Receiver ==> Redis Stream

**生产环境**中无需编码,通过在SIEM平台中配置Webhook即可将告警数据导入Redis Stream 消息队列. 配置方法 [SIEM集成](../../production/siem/)

**开发环境**中可以通过脚本将测试告警导入Redis Stream,方法参考 [导入测试告警](../ES-Rule-21-Phishing_user_report_mail/#导入测试告警).

## 告警流式分析

Redis Stream ==> Module ==> SIRP

用户可开发自定义模块来流式处理队列中每一条告警,每个模块对应处理 Redis Stream 一个消息队列,告警经过用户使用 Langgraph/Dify 构建的AI
Agent 模块处理后,将处理结果发送至 SIRP.

## 导入测试告警 / 单模块 & 单告警调试 / 告警聚合 (SIRP)

参考 [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/)