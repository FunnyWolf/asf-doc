# ES-Rule-21-Phishing_user_report_mail

## Importing Test Alerts

All sample modules provided by ASP include test alert data located in `DATA/{module_name}/mock_alert.py`. Executing this script will import the test alert data into Redis Stream.

## Single Module & Single Alert Debugging

- During module development, developers often need to debug a specific alert.
- The ASP framework allows for debugging modules individually without starting the entire framework. For code reference, see the `if __name__ == "__main__":` section of this module.

- Developers only need to find the Stream queue corresponding to the module in Redis Insight and get the ID of a specific alert.

![img.png](img.png)

- Then, assign the ID to the `module.debug_message_id` variable and run the module script to debug that alert.

![img_1.png](img_1.png)

## Alert Aggregation (SIRP)

The [GroupRule](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/Lib/grouprule.py) class is used for alert aggregation, grouping multiple Alerts into a single Case according to a Rule. Refer to the code comments for usage.

### Scenario One

- In the SIEM platform, the rule `ES-Rule-21-Phishing_user_report_mail` sends metadata of all user-reported phishing emails as alerts to Redis Stream.
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

- `deduplication_fields` indicates which Artifact of the Alert is used as the basis for aggregation (here, the sender).
- `deduplication_window` indicates the time window for aggregating Alerts (here, 24h).
- After aggregation, even if an attacker sends an email to multiple users, only one Case will be generated in SIRP, reducing the analyst's workload.
- Because all related information is added to this Case, analysts and AI Agents can easily access all data.

### Scenario Two

- In the SIEM platform, the rule `NDR-Rule-05-Suspect-C2-Communication` sends all network traffic suspected of C2 communication as alerts to Redis Stream.
- The ASP module `NDR-Rule-05-Suspect-C2-Communication` uses an AI Agent built with Langgraph to analyze each alert, confirm if it is suspected C2 communication, and format it into the SIRP Alert format.
- We want to aggregate all alerts of suspected C2 communication from the same host within 1 hour into a single SIRP Case.

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

Analysts and summary-analysis AI Agents should process a collection of Alerts (a Case) rather than individual Alerts, which can greatly improve analysis efficiency.