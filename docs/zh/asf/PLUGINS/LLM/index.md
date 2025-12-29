# LLM 插件

## 配置方法

- 将PLUGINS/LLM/CONFIG.example.py重命名为CONFIG.py
- 根据代码注释填写配置项
- LLM支持添加多个配置,每个配置可以添加多个Tag,支持通过tag调用对应的LLM配置
- 通过以上方法可以针对不同场景使用不同的LLM配置,达到性能和成本的平衡

## Ollama

- 可参考`Docker\ollama\ollama_nginx`为 ollama 添加 Basic Auth