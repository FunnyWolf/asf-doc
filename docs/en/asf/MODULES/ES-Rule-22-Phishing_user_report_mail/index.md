# ES-Rule-22-Phishing_user_report_mail

- The `alert_preprocess_node` function demonstrates how to read an alert from the Redis Stream queue and perform simple data processing.
- The `alert_analyze_node` function demonstrates how to call the Dify App REST API and format the output results.
- The `alert_output_node` function demonstrates the use of custom aggregation rules and how to send the analysis results to SIRP.