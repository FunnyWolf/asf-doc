# Case

- Provides a centralized view for incident response personnel to manage and track the handling process of security events.
- Users can assign and update security tickets, ensuring that each event is handled promptly and effectively.

## View

- Supports multiple filtering and sorting functions.

![img.png](img.png)

![img_1.png](img_1.png)

## Detail

![img_2.png](img_2.png)
> Case Operations Panel - Shows Case basic information

## Enrichment

![img_18.png](img_18.png)
> All Enrichment records associated with the Case. Supports clicking on Enrichment records to view details

## Alert

> All alerts associated with the Case. Supports clicking on Alert records to view alert details

![img_3.png](img_3.png)

## AI

![img_4.png](img_4.png)

> Displays the analysis results of AI Agent

## Workbook

> Operations manual for Case handling, guiding analysts to complete investigation and response work, supports Markdown format.
>
> Workbook can use [] checkbox options and other methods, making it convenient for analysts to complete tasks step by step.

![img_5.png](img_5.png)

## Threat Hunting

> Report output from Threat Hunting Agent

![img_15.png](img_15.png)
![img_16.png](img_16.png)

> Tool invocation records of Threat Hunting Agent

![img_17.png](img_17.png)

## Playbook

> Automated playbook execution records associated with the Case.

![img_7.png](img_7.png)

## System

> Internal system fields for system use only.

![img_6.png](img_6.png)

- Detect Time

Detection time

- Acknowledge Time

Acknowledgment time

- Respond Time

Response time

- Deduplication Key

Alert aggregation keyword, used to aggregate similar alerts into the same Case.

## Operation Log

You can view the change history of a Case for audit and tracking purposes.

![img_9.png](img_9.png)

## War Room

You can view and participate in discussions related to the Case, collaborate with the team to handle it, and it can also be used as a war room for the Case.

![img_8.png](img_8.png)

## Execute Playbook

> For Playbook development, refer to [Playbook Development Guide](../../../asp/PLAYBOOKS/development/)

- Open the detail page and click the `Run Playbook` button in the upper left corner.

![img_11.png](img_11.png)

- Select the Playbook to execute and click the `Confirm` button.

![img_10.png](img_10.png)

- The initial task status is `Pending`, waiting for scheduling execution.

![img_12.png](img_12.png)

- During task execution, the status is `Running`.

![img_13.png](img_13.png)

- After task execution is complete, the status is `Success` or `Failed`. Click on the task record to view execution details.

![img_14.png](img_14.png)