# Knowledge

Store and manage the SOC team's knowledge base. Supports keyword search and can be invoked by AI Agents.

## View

![img.png](img.png)

## Detail

![img_1.png](img_1.png)

- Title

The knowledge entry title.

- Body

The knowledge entry content, supports Markdown.

- Tags

Knowledge tags, used for filtering and categorization.

- Source

Knowledge source. `Manual` means manually created. `Case` means automatically extracted from resolved Cases (via the Knowledge Extraction playbook).

- Expires At

Knowledge expiration date. Leave empty for permanently valid entries. Expired entries will no longer appear in searches.

## Knowledge Sources

- **Manual Creation**: Users directly write knowledge entries in the platform
- **Case Extraction**: Execute the [Knowledge Extraction playbook](../../../asp/PLAYBOOKS/Knowledge_Extraction/index.md) on resolved Cases to extract reusable knowledge from Case investigation records and discussions using LLM
