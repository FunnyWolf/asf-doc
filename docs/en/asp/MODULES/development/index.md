# Development Guide

ASF modules are used for **automated** stream processing of alert data. Each module corresponds to a message queue in Redis Stream, and each time a module runs, it processes one alert from the queue.

All module code is located in the `MODULES` directory.

## Alert Import

NDR/EDR/XDR/.. ==> SIEM ==> Alert Rule ==> Webhook ==> ASP Webhook Receiver ==> Redis Stream

In a **production environment**, no coding is required. Alert data can be imported into the Redis Stream message queue by configuring a Webhook in the SIEM platform. For configuration method, see [SIEM Integration](../../production/siem/).

In a **development environment**, test alerts can be imported into Redis Stream via a script. For the method, refer to [Import Test Alerts](../ES-Rule-21-Phishing-User-Report-Mail/#import-test-alerts).

## Alert Stream Analysis

Redis Stream ==> Module ==> SIRP

Users can develop custom modules to stream-process each alert in the queue. Each module corresponds to processing one message queue in Redis Stream. After the alert is processed by the AI Agent module built by the user with LangGraph, the processing result is sent to SIRP.

## Import Test Alerts / Single Module & Single Alert Debugging / Alert Aggregation (SIRP)

Refer to [ES-Rule-21-Phishing_user_report_mail](../ES-Rule-21-Phishing-User-Report-Mail/).
