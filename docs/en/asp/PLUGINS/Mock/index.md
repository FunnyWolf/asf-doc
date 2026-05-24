# Mock Plugin

Before deploying ASF in production environments, it is recommended to test the Agent's architecture and data flow through this plugin.

## CMDB

Simulates enterprise CMDB API interfaces

## SIEM

- Generates three types of test logs: `siem-network-traffic`, `siem-host-events`, and `siem-aws-cloudtrail`
- Supports both `ELK` and `Splunk` SIEM platforms
- The generated test data can be used with the configuration files `siem-network-traffic.yaml`, `siem-host-events.yaml`, and `siem-aws-cloudtrail.yaml` in the SIEM plugin

#### Configuration

- Copy CONFIG.example.py to CONFIG.py
- Modify the configuration items in CONFIG.py
- The default EPS is 10, which can be modified in settings.py as needed
- Run main.py to start generating logs

## SIRP

- Generates complete test data for `Case`, `Alert`, `Artifact`, `Enrichment`, and `Ticket`, with automatic data association
- Developers can refer to `mock_*.py` to build new Mock data or understand how to use SIRP API
- Run main.py to start generating logs
