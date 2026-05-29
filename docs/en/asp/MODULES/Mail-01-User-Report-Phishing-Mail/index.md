# Mail-01-User-Report-Phishing-Mail

Analyze phishing emails reported by end users, extract Artifacts such as sender, URL, and attachments, and aggregate into Cases via correlation_uid.

- MITRE ATT&CK: **T1566.001 - Spearphishing Attachment**
- This module uses Langgraph to build an AI Agent with three Nodes: `alert preprocessing`, `LLM analysis`, and `result output`. Recommended as a reference for Langgraph-type modules

## Log Source

Logs are sourced from `DATA/MODULES/Mail-01-User-Report-Phishing-Mail/mock_alert.py`, containing both legitimate and malicious email samples, sent to the corresponding Stream via `RedisStreamAPI`.

## Key Processing Logic

- **Field Extraction**: Parse email headers (From/To/Subject/Date/Return-Path/Authentication-Results) and body (plain_text/html)
- **Suspicious Signal Detection**: SPF/DKIM/DMARC failure, suspicious URLs (HTTP or domain mismatch), suspicious attachment extensions, urgent keyword hits
- **Artifact**: Sender/recipient email addresses, email subject, body URLs, attachment filenames
- **Aggregation**: Aggregate by `[sender]` (or normalized subject) within 12h into the same Case
- **Severity**: Suspicious signals >=3 -> High, >=1 -> Medium, 0 -> Informational
