# LLM Provider

LLM Provider 定义 ASP 使用的大模型连接方式。

## 字段

| 字段 | 说明 |
| --- | --- |
| Name | 配置名称，唯一。 |
| Base URL | 模型服务地址。 |
| Model | 模型名称。 |
| API Key | 访问密钥。 |
| Proxy | 可选代理。 |
| Tags | 模型能力标签。 |
| Enabled | 是否启用。 |
| Priority | 优先级，数字越小越靠前。 |

## 标签

常用标签：

- `fast`
- `powerful`
- `tool_calling`
- `structured_output`

不同任务可以根据标签选择合适模型。
