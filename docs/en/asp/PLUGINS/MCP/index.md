# MCP Plugin

## Configuration

- Run the MCP Server

```bash
python PLUGINS/MCP/mcpserver.py
```

Supports specifying host, port, and uuid

```bash
python PLUGINS/MCP/mcpserver.py --host 10.10.10.10 --port 7001 --uuid thisisjustfortest
```

- Configure the MCP SSE URL; the script will output the MCP SSE URL (needed when configuring the [ClaudeCode Plugin](../ClaudeCode/index.md))

```
mcp server url: http://10.10.10.10:7001/thisisjustfortest/sse
INFO:     Started server process [13828]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://10.10.10.10:7001 (Press CTRL+C to quit)
```

## Currently Supported Tools

```python
REGISTERED_MCP_TOOLS = [

    # case
    list_cases,
    update_case,

    # alert
    list_alerts,

    # artifact
    list_artifacts,

    # enrichment
    create_enrichment,

    # playbook
    list_playbook_definitions,
    execute_playbook,
    list_playbook_runs,

    # knowledge
    update_knowledge,
    search_knowledge,

    # SIEM
    get_current_time,
    siem_explore_schema,
    siem_adaptive_query,
    siem_keyword_search,
    siem_discover_index_fields,

    # Threat Intelligence
    ti_query,

    # Stream Debug
    read_stream_message_by_id,
    read_stream_head,

]
```
