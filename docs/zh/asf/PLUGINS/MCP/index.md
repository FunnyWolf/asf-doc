# MCP 插件

## 配置方法

- 运行 MCP Server
```bash
python PLUGIN/MCP/mcp_server.py
```

支持指定host,port,和uuid
```bash
python PLUGIN/MCP/mcp_server.py --host 127.0.0.1 --port 7002 --uuid thisisjustfortest 
```

- 配置 MCP SSE URL
脚本会将MCP SSE 的 URL输出 

```
mcp server url: http://127.0.0.1:7002/thisisjustfortest/sse
INFO:     Started server process [13828]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:7002 (Press CTRL+C to quit)
INFO:     Shutting down
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [13828]
```

## 当前支持的Tools

```python
REGISTERED_MCP_TOOLS = [

    # case
    list_cases,
    get_case_discussions,
    update_case,

    # alert
    list_alerts,
    get_alert_discussions,
    update_alert,

    # artifact
    list_artifacts,

    # enrichment
    create_enrichment,
    attach_enrichment_to_target,

    # playbook
    list_available_playbook_definitions,
    execute_playbook,
    list_playbook_runs,

    # knowledge
    list_knowledge,
    update_knowledge,
    search_knowledge,

    # ticket
    list_tickets,
    create_ticket,
    update_ticket,
    attach_ticket_to_case,

    # SIEM
    get_current_time,
    siem_explore_schema,
    siem_adaptive_query,
    siem_keyword_search,

]
```