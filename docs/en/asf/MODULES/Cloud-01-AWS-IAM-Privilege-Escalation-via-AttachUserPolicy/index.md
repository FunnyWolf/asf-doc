# Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy

- Shows how to map alert logs in other formats (AWS CloudTrail) to ASP Alert (OCSF Finding)
- Shows how to split Artifacts and generate a correlation_uid so related Alerts can be grouped into a Case

## Module Architecture

- The module's logs come from the [Mock plugin](../../PLUGINS/MCP/) CloudGenerator (which generates AWS CloudTrail logs). The log definition is described in this [YAML](https://github.com/FunnyWolf/agentic-soc-platform/blob/master/DATA/Plugin_SIEM_Indexes/siem-aws-cloudtrail.yaml)