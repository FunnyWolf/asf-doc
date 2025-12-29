# Huggingface 插件

## 下载模型

Huggingface 插件允许您从 Huggingface 模型库下载预训练模型。

```bash
python PLUGINS/Huggingface/download_model.py
```

## 使用 HF_ENDPOINT 或 代理

如果您在中国大陆或其他网络受限区域使用 Huggingface 插件, 可以通过修改代码中的 `HF_ENDPOINT` 变量来指定一个可用的 Huggingface 镜像站点。
