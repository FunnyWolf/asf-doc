# Knowledge Extraction

Automatically extract reusable security knowledge from closed (with verdict) Cases and store it in the SIRP Knowledge worksheet.

## Registered Name

`Knowledge Extraction`

## Execution Flow

1. Load complete Case data
2. Check whether the Case has a verdict (skip if no verdict)
3. Serialize Case data into AI analysis format and retrieve discussion records
4. Call LLM to extract knowledge (title, body, tags)
5. If extractable knowledge is found, create a Knowledge record

## Trigger Methods

- Manually execute Playbook from the SIRP platform Case detail page
- Applicable to closed Cases that have been assigned a verdict
