# 模块列表

所有模块代码均位于 `MODULES` 目录下

### [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/)

- 使用 Langgraph 构建的AI Agent,包含`告警预处理`,`LLM分析`,`结果输出`三个Langgraph Node.
- 模块用于分析终端用户上报的钓鱼邮件样本,分析邮件是否为钓鱼邮件/置信度/分析过程,并将结果发送至 SIRP.
- **推荐在参考该模块代码来开发 Langgraph 类型模块**.

### [ES-Rule-22-Phishing_user_report_mail](../ES-Rule-22-Phishing_user_report_mail/)

- 使用 Dify 构建的AI Agent,包含`告警预处理`,`LLM分析`,`结果输出`三个 Node.
- 模块用于分析终端用户上报的钓鱼邮件样本,分析邮件是否为钓鱼邮件/置信度/分析过程,并将结果发送至 SIRP.

- **不推荐在生产环境中使用Dify构建模块,只用于开发过程中调试提示词**

### [NDR-Rule-05-Suspect-C2-Communication](../NDR-Rule-05-Suspect-C2-Communication/)

- 展示如何使用AI Agent分析SIRP中的Case.
- **调整 AI Agent 提示词即可将该模块迁移到其他类型告警(EDR/Cloud等)**