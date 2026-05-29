# System Configuration

## Custom Icons

![img.png](img.png)

## Webhook for Receiving Emails

SIRP features such as `Reset Password` and `Invite External User` depend on email sending. Users can configure a Webhook to receive these emails.

For configuration instructions, refer to [Custom Integration Webhook for Receiving Emails](https://docs-pd.nocoly.com/faq/email#self-integration)

`appextensions.json` file contents

```json
{
  "WebhookUrl": "http://192.168.241.1:7000/api/v1/webhook/nocolymail",
  "WebhookHeaders": {}
}
```
