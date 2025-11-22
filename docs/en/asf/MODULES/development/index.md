# Development Guide

ASF modules are used for the **automated** streaming of alert data. Each module corresponds to a message queue in Redis Stream, and each run of a module processes one alert from the queue.

## Alert Import

NDR/EDR/XDR/.. ==> SIEM ==> Alert Rule ==> Webhook ==> ASF Webhook Receiver ==> Redis Stream

In a **production environment**, you can import alert data into the Redis Stream message queue by configuring a Webhook in the SIEM platform, without any coding. For the configuration method, see [SIEM Integration](../../production/siem/).

In a **development environment**, you can import test alerts into Redis Stream using a script. For the method, refer to [Importing Test Alerts](../ES-Rule-21-Phishing_user_report_mail/#importing-test-alerts).

## Streaming Alert Analysis

Redis Stream ==> Module ==> SIRP

Users can develop custom modules to process each alert in the queue. Each module corresponds to a message queue in Redis Stream. After the alerts are processed by the AI Agent module built by the user with Langgraph/Dify, the results are sent to SIRP.

## Importing Test Alerts / Single Module & Single Alert Debugging / Alert Aggregation (SIRP)

Refer to [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing_user_report_mail/)