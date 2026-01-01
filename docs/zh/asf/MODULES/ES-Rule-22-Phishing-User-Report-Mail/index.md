# ES-Rule-22-Phishing-User-Report-Mail

- 使用 Dify 构建的AI Agent,包含`告警预处理`,`LLM分析`,`结果输出`三个 Node.
- 模块用于分析终端用户上报的钓鱼邮件样本,分析邮件是否为钓鱼邮件/置信度/分析过程,并将结果发送至 SIRP.

- **不推荐在生产环境中使用Dify构建模块,只用于开发过程中调试提示词**

## 模块架构

- `alert_preprocess_node` 函数展示如何从Redis Stream队列中读取告警并进行简单数据处理.
- `alert_analyze_node` 函数展示如何调用 Dify App REST API,格式化输出结果.
- `alert_output_node` 函数展示自定义聚合规则使用,如何将分析结果发送至 SIRP.