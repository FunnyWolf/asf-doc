# LLM Plugin

## Configuration Method

- Rename PLUGINS/LLM/CONFIG.example.py to CONFIG.py
- Fill in the configuration items according to the code comments
- LLM supports adding multiple configurations, each configuration can add multiple Tags, and supports calling the corresponding LLM configuration through tags.
- Through the above method, different LLM configurations can be used for different scenarios to achieve a balance between performance and cost.

## Ollama

- Refer to `Docker\ollama\ollama_nginx` to add Basic Auth for Ollama.
