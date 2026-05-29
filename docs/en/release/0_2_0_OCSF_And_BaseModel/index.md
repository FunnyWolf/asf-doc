# 0.2.0 - OCSF and BaseModel

## Feature Highlights

- [Case](../../sirp/Feature/case/) has been restructured based on the [OCSF Incident Finding](https://schema.ocsf.io/1.7.0/classes/incident_finding) standard, providing a unified
  data structure for event investigation and response.
- [Alert](../../sirp/Feature/alert/) has been restructured based on the [OCSF Detection Finding](https://schema.ocsf.io/1.7.0/classes/detection_finding) standard, providing a
  unified alert data structure.
- New [Enrichment](../../sirp/Feature/enrichment/) module added for storing enrichment data. (Ticket module deprecated)

## Optimization

- Refactored SIRP plugin code to use BaseModel and updated API, improving code consistency and maintainability.

## Developer Notes

The Case and Alert modules of the new version SIRP platform have been restructured based on the OCSF standard. The benefits are as follows:

1. Unified Data Structure: OCSF provides a unified framework that makes data exchange between different security tools and platforms easier.
2. Rich Fields: The OCSF standard defines rich fields that cover key information for most security events and alerts, helping to improve data completeness. Users basically no
   longer need to customize fields.
3. Ecosystem Support: Adopting the OCSF standard makes SIRP easier to integrate with other tools and platforms that support OCSF, expanding SIRP's application scenarios.

The ASF plugin code has been refactored to use BaseModel, with the main goal of improving code consistency and maintainability. It provides better IDE hints and type checking,
reducing runtime errors.
