# Knowledge

Keyword search and maintenance of the internal knowledge base.

## Trigger Scenarios

- Search for related content in the knowledge base by keyword
- Update the title, content, tags, or expiration time of a knowledge entry

## Usage Examples

![img.png](img.png)

## Input

| Parameter      | Description                            |
|---------|-------------------------------|
| keyword | Search keyword, matches title and body         |
| Update fields    | title, body, expires_at, tags |

## Output

Knowledge entry list: ID, title, tags.

## Dependencies

MCP tools: `search_knowledge`, `update_knowledge`.

> Search automatically filters out expired records. Knowledge can be automatically extracted from closed Cases via the Knowledge Extraction playbook.
