# CLAUDE.md

## 项目结构

- **agentic-soc-platform/** — Django 框架实现的 SOC 平台
- **asp-doc/** — VitePress 实现的文档网站
- **asp-marketplace/** — asp的 claude code marketplace 代码目录,包含asp plugin/skills/mcp配置/agents

## 规则
- 当前主要是根据 agentic-soc-platform 修改 asp-doc,也就是根据代码优化完善文档,如无必要或者用户要求,无需修改agentic-soc-platform/中的代码
- 默认文档只需要优化编写 asp-doc/docs/zh 文档,也就是只需要优化中文文档,只有用户要求同步到英文时在根据zh文档同步翻译成en文档
- 编写文档时简洁为第一原则也是最重要的原则