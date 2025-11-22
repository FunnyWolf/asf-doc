# SIRP Plugin

## Set Global Variables

![img_7.png](img_7.png)

![img_8.png](img_8.png)

![img_9.png](img_9.png)

> Used for ASF's REST API authentication, must be consistent with ASF_TOKEN in the ai-soc-framework/CONFIG.py file.

![img_10.png](img_10.png)

> Used to call the ASF Playbook interface, please modify the IP according to your actual configuration.

## Configuration Method

- Rename the configuration file ai-soc-framework/PLUGINS/SIRP/CONFIG.example.py to CONFIG.py to apply the configuration.
- SIRP_URL is the SIRP platform address, e.g., http://192.168.241.128:8880
- SIRP_APPKEY and SIRP_SIGN

![img_11.png](img_11.png)

![img_12.png](img_12.png)

> AppKey corresponds to SIRP_APPKEY, Sign corresponds to SIRP_SIGN.

- SIRP_NOTICE_WEBHOOK

![img.png](img.png)

![img_1.png](img_1.png)

![img_2.png](img_2.png)

> Configure the notification Webhook address to SIRP_NOTICE_WEBHOOK.
