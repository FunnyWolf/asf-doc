# Knowledge

存储和管理SOC团队的知识库,支持Markdown格式,Agent可调用.

## View

![img.png](img.png)

## Detail

![img_1.png](img_1.png)

- Title

知识条目标题.

- Body

知识条目内容

- Using

知识条目是否正在使用 (Agent是否能调用)

- Action

知识库动作.

知识条目调整为 `Store` 时, 后台会自动将该知识条目存储到 "sirp_knowledge" 的 collection 中.完成后,该条目标记为 `Using`,Action 被重置为 `Done`.

知识条目调整为 `Remove` 时, 后台会自动将该知识条目从 "sirp_knowledge" 的 collection 中删除.完成后,该条目标记为 不使用,Action 被重置为 `Done`.