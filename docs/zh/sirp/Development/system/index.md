# 系统配置

## 自定义图标

![img.png](img.png)

## Webhook接收邮件

SIRP 的`重置密码`、`邀请外部用户`等功能依赖邮件发送。用户可以通过配置 Webhook 来接收这些邮件。

配置方法参考 [自定义集成 Webhook 接收邮件](https://docs-pd.nocoly.com/faq/email#self-integration)

`appextensions.json`文件内容

```json
{
  "WebhookUrl": "http://192.168.241.1:7000/api/v1/webhook/nocolymail",
  "WebhookHeaders": {}
}
```
