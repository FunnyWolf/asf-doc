# Module Creator

Create alert processing modules for SIEM Rules, converting raw alerts into Case/Alert/Artifact.

## Trigger Scenarios

- Create a new processing module for a SIEM Rule
- Write an alert processing script
- Connect SIEM alerts into the ASP SIRP pipeline

## Usage Examples

![img.png](img.png)

## Input

| Parameter           | Description                                               |
|--------------|--------------------------------------------------|
| Rule name      | Full SIEM Rule name, also used as the module filename and Redis Stream name          |
| raw_alert sample | Raw alert JSON obtained from Redis Stream / file / Redis Insight |

## Output

- `MODULES/<rule-name>.py`: Processing module code
- `TEST/test_module_<slug>.py`: Test script

## Dependencies

Underlying dependencies: `BaseModule`, `PLUGINS.SIRP.sirpapi` (Alert, Case), `PLUGINS.SIRP.sirpcoremodel` (data model), `PLUGINS.SIRP.correlation` (correlation aggregation).

> The filename must exactly match the SIEM Rule name (case-sensitive). Obtain a raw_alert sample first before writing code; do not guess the field structure.
