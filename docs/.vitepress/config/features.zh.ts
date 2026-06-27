export const featuresConfig = [
    {
        kicker: 'Signal intake',
        title: '告警洪水,收敛成可处置案件',
        titleAccent: '告警洪水',
        details: 'Module 流式消费 SIEM / Webhook 告警,自动提取 IOC、关联上下文并生成 Case、Alert、Artifact,让大量原始日志沉淀为少量可分诊、可追踪、可复盘的安全事件。',
        image: `/hero/zh/img_1.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/case/',
        linkText: '查看 Case 工作台'
    },
    {
        kicker: 'AI investigation',
        title: 'AI 秒级生成调查报告',
        titleAccent: 'AI 秒级',
        details: '围绕 Case 自动汇总告警、实体、日志和富化结果,输出严重性、置信度、影响、优先级、判定、攻击链和处置建议,把重复梳理压缩成可审阅的初稿。',
        image: `/hero/zh/img_2.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/case/',
        linkText: '了解调查视图'
    },
    {
        kicker: 'Playbooks',
        title: '一键触发,复杂调查自动推进',
        titleAccent: '一键触发',
        details: '围绕 Case 启动 LLM 调查、知识提取、威胁情报富化和 CMDB 富化,把传统 SOAR 流程、AI 分析和人工决策编排到同一套 Playbook 中。',
        image: `/hero/zh/img_3.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/playbook/',
        linkText: '查看 Playbook'
    },
    {
        kicker: 'Agent ecosystem',
        title: '让 AI Agent 直接进入 SOC 流程',
        titleAccent: 'AI Agent',
        details: '通过 MCP 和插件向 Claude Code / Codex / OpenCode 等 Agent 暴露 ASP 能力,让 Agent 可以操作 Case、搜索日志、查询威胁情报、编写模块和剧本。',
        image: `/hero/zh/img_6.png?v=${Date.now()}`,
        link: '/zh/asp/integrations/claude-code/',
        linkText: '查看 Claude Code 集成'
    },
    {
        kicker: 'Unified data',
        title: '多 SIEM 接入,统一调查入口',
        titleAccent: '多 SIEM',
        details: '通过 YAML 配置统一管理 Splunk、ELK 等日志源和索引动作,让 LLM、Agent 和分析师使用同一套检索接口,不用关心底层查询差异。',
        image: `/hero/zh/img_4.png?v=${Date.now()}`,
        link: '/zh/asp/development/siem-yaml/',
        linkText: '了解 SIEM YAML'
    },
    {
        kicker: 'Enrichment',
        title: '威胁情报自动富化',
        titleAccent: '威胁情报',
        details: '围绕 IOC 和 Artifact 自动补全声誉、脉冲、资产、身份和历史上下文,让每个可疑实体都带着判断依据进入调查视图。',
        image: `/hero/zh/img_5.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/enrichment/',
        linkText: '查看 Enrichment'
    },
    {
        kicker: 'Knowledge loop',
        title: '知识持续积累,越用越智能',
        titleAccent: '知识持续积累',
        details: '从已关闭 Case 的调查记录、处置过程和讨论中提取可复用知识,形成组织级安全知识库,让下一次相似事件更快进入正确路径。',
        image: `/hero/zh/img_7.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/knowledge/',
        linkText: '查看 Knowledge'
    },
    {
        kicker: 'Governance',
        title: '协作、审计和访问控制内置',
        titleAccent: '协作、审计',
        details: '本地/LDAP 登录、用户角色、API Key、Inbox 通知和 Audit Log 形成基础治理能力,让协作、追责和自动化访问都留在平台内。',
        image: `/hero/zh/img_9.png?v=${Date.now()}`,
        link: '/zh/asp/workspace/audit-log/',
        linkText: '查看 Audit Log'
    },
    {
        kicker: 'Customization',
        title: '低成本适配,高灵活定制',
        titleAccent: '低成本适配',
        details: '用 Python 自定义 Module 适配新的 SIEM 规则和告警源,用 Playbook 编排 LLM 分析与自动化动作,让平台按你的安全场景持续生长。',
        image: `/hero/zh/img_10.png?v=${Date.now()}`,
        link: '/zh/asp/development/module-examples/',
        linkText: '查看 Module 示例'
    },
    {
        kicker: 'Deployment',
        title: '开源、私有化、Python & TypeScript',
        titleAccent: '开源、私有化',
        details: 'MIT 开源许可证,支持完全本地化部署,安全数据不出内网。后端、前端、扩展脚本和部署流程都清晰可控,方便团队二次开发。',
        image: `/hero/zh/img_8.png?v=${Date.now()}`,
        link: '/zh/asp/quick-start/deployment/',
        linkText: '查看部署方式'
    },
]
