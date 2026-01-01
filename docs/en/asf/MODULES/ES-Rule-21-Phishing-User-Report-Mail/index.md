# ES-Rule-21-Phishing_user_report_mail

- An AI Agent built with Langgraph, including three Langgraph Nodes: `alert preprocessing`, `LLM analysis`, and `result output`.
- The module is used to analyze phishing email samples reported by end-users, determine whether the email is a phishing email, its confidence level, the analysis process, and send the results to SIRP.
- **It is recommended to refer to this module's code to develop Langgraph-type modules.**

## Import Test Alerts

All sample modules provided by ASF include test alert data located in `DATA/{module_name}/mock_alert.py`. Executing this script will import the test alert data into the Redis Stream.

## Single Module & Single Alert Debugging

- During module development, developers often need to debug a specific alert.
- The ASP framework allows for debugging modules individually without starting the entire framework. The code can be found in the `if __name__ == "__main__":` section of this module.

- Developers only need to find the corresponding Stream queue for the module in Redis Insight and get the ID of a specific alert.

![img.png](img.png)

- Then assign the ID to the `module.debug_message_id` variable and run the module script to debug the alert.

![img_1.png](img_1.png)

## Alert Aggregation (SIRP)

The [GroupRule](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/Lib/grouprule.py) class is used for alert aggregation, combining multiple Alerts into a single Case based on a Rule. Refer to the code comments for usage.

### Scenario 1

- The `ES-Rule-21-Phishing_user_report_mail` rule in the SIEM platform sends metadata of all user-reported phishing emails as alerts to the Redis Stream.
- The ASP module `ES-Rule-21-Phishing_user_report_mail` uses an AI Agent built with Langgraph to analyze each alert, confirm if it is a phishing email, and format it into the SIRP Alert format.
- We want to aggregate all phishing emails reported by the same sender within 24 hours into a single SIRP Case.

```python
rule = GroupRule(
    rule_id=self.module_name,
    rule_name=rule_name,
    deduplication_fields=["mail_from"],
    deduplication_window="24h",
    source="Email",
    workbook=workbook)
```

- `deduplication_fields` indicates which artifact of the Alert to use for aggregation (here, the sender).
- `deduplication_window` indicates the time window for aggregating Alerts (here, 24h).
- With aggregation, even if an attacker sends an email to multiple users, only one Case will be generated in SIRP, reducing the workload for analysts.
- Since all relevant information is added to the Case, analysts and AI Agents can easily access all data.

### Scenario 2

- The `NDR-Rule-05-Suspect-C2-Communication` rule in the SIEM platform sends all network traffic suspected of C2 communication as alerts to the Redis Stream.
- The ASP module `NDR-Rule-05-Suspect-C2-Communication` uses an AI Agent built with Langgraph to analyze each alert, confirm if it is suspected C2 communication, and format it into the SIRP Alert format.
- We want to aggregate all alerts for suspected C2 communication from the same host within 1 hour into a single SIRP Case.

```python
rule = GroupRule(
    rule_id=self.module_name,
    rule_name=rule_name,
    deduplication_fields=["hostname"],
    deduplication_window="1h",
    source="NDR",
    workbook=workbook
)
```

Analysts and summary-analysis AI Agents should process Alert collections (Cases) instead of individual Alerts to greatly improve analysis efficiency.
