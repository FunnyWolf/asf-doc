# SIEM Integration

## Webhook Forwarder

- ASF has a built-in Webhook receiving node that forwards alarms sent by SIEM Webhook to the corresponding Stream in Redis Stack.
- The Forwarder automatically parses the alarm names in Kibana/Splunk and creates a Stream with the same name in Redis Stack based on the alarm name.
- The Forwarder implementation code is `Forwarder/views.py`.
- The URL format for the Forwarder is `http://<ASF_SERVER_IP>:<ASF_SERVER_PORT>/api/v1/webhook/<SIEM_NAME>`, where `<SIEM_NAME>` supports `kibana` and `splunk`.
- For ease of integration, the Forwarder Webhook does not require authentication and access can be controlled through a firewall.

## Splunk Integration

- The SOC team first needs to integrate security devices or related system logs into Splunk according to their own needs, and create alarms based on business requirements.

  ![img.png](img.png)

- Select `For each result` as the trigger to ensure all alarms are captured.
- The Webhook URL is `http://<ASF_SERVER_IP>:<ASF_SERVER_PORT>/api/v1/webhook/splunk`.
- The Forwarder will automatically forward the alarm to the corresponding Stream in Redis Stack. The Stream name is the alarm name.
- For example, the alarm in the image above will be forwarded to the `Phishing_user_Report_Dify_Nocodb` queue of the Redis Stream.

![img_1.png](img_1.png)

- Create the `Phishing_user_Report_Dify_Nocodb.py` module in `MODULE` to process this alarm.
- The original content of a Splunk alarm is usually stored in the `_raw` field. The Forwarder will process the content of this field as the main information of the alarm. When parsing the alarm in a module, the following code is usually used:

```python
alert = self.read_message()
if alert is None:
    return

# Example: For Splunk webhooks
alert = json.loads(alert["_raw"])
```

## Kibana (ELK) Integration

- The SOC team first needs to integrate security devices or related system logs into ELK according to their own needs, and create Rules based on business requirements.
- Create a `Webhook Connector`, set `Authentication` to `None`, and add the header `Content-Type: application/json`.
- The Webhook URL is `http://<ASF_SERVER_IP>:<ASF_SERVER_PORT>/api/v1/webhook/kibana`.

  ![img_2.png](img_2.png)

- In each Rule in Kibana, select the `Webhook Connector` created above for the `Action`.
- Use the following JSON template for the `Message` content (context.hits contains the documents filtered by the alarm, i.e., the original logs):

```
{
  "rule":{
    "name":"{{rule.name}}"
  },
  "context":{
    "hits":[{{{context.hits}}}]
  }
}
```

- In `Details`, the `Rule name` will be used as the alarm name. The Forwarder will forward the alarm to the corresponding Stream in Redis Stack, and the Stream name will be the alarm name.

![img_3.png](img_3.png)

- For example, the alarm in the image above will be forwarded to the `Phishing_User_Report_Kibana_Langgraph_Thehive` queue of the Redis Stream.

![img_4.png](img_4.png)

- Create the `Phishing_User_Report_Kibana_Langgraph_Thehive.py` module in `MODULE` to process this alarm.

