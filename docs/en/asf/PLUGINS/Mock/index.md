# Mock Plugin

## Configuration Method

- This plugin requires no additional configuration and can be used after installation.
- Before deploying ASP in a production environment, it is recommended to test the Agent's architecture and data flow using this plugin.

## Features

### CMDB

Simulates enterprise CMDB API interface.

### SIEM

Simulates SIEM data query interface through LLM interface. The input is a natural language query request, and it returns simulated SIEM log data. For usage, refer to the `if __name__ == "__main__":` code.

### Threat Intelligence

Simulates threat intelligence query interface.

### SIRP

Generates Alert data for various types of devices, and uses built-in aggregation rules to generate Cases.
