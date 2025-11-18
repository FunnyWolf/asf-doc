# 模块开发

## 告警导入

NDR/EDR/XDR/.. ==> SIEM ==> Alert Rule ==> Webhook ==> ASF Webhook Receiver ==> Redis Stream

生产环境中无需编码,通过在SIEM平台中配置Webhook即可将告警数据导入ASF的Redis
Stream中. 配置方法参考 [SIEM集成](../../production/siem/)

开发环境中可以通过脚本将测试告警导入Redis Stream,方法参考 [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/) `导入测试告警`章节.

## 告警流式分析

Redis Stream ==> Module ==> SIRP

用户可开发自定义模块来流式处理队列中每一条告警,每个模块对应处理 Redis Stream 一个消息队列,告警经过用户使用 Langgraph/Dify 构建的AI
Agent 模块处理后,将处理结果发送至 SIRP.

## 模块模板

### [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/)

- 使用 Langgraph 构建的AI Agent,包含`告警预处理`,`LLM分析`,`结果输出`三个Langgraph Node.
- 模块用于分析终端用户上报的钓鱼邮件样本,分析邮件是否为钓鱼邮件/置信度/分析过程,并将结果发送至 SIRP.
- 推荐在参考该模块代码来开发 Langgraph 类型模块.

### [ES-Rule-22-Phishing_user_report_mail](../ES-Rule-22-Phishing_user_report_mail/)

- 使用 Dify 构建的AI Agent,包含`告警预处理`,`LLM分析`,`结果输出`三个 Node.
- 模块用于分析终端用户上报的钓鱼邮件样本,分析邮件是否为钓鱼邮件/置信度/分析过程,并将结果发送至 SIRP.

- **不推荐在生产环境中使用Dify构建模块,只用于开发过程中调试提示词**
