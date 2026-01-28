import {type DefaultTheme, defineConfig} from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/asf/': {base: '/zh/asf/', items: sidebarASF()},
            '/zh/sirp/': {base: '/zh/sirp/', items: sidebarSIRP()},
        },

        footer: {
            // message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `版权所有 © 2020-${new Date().getFullYear()} Funnywolf`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                // timeStyle: 'short'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: '开发框架',
            link: '/zh/asf/Introduction/what_is_asf/',
            activeMatch: '/zh/asf/'
        },
        {
            text: '运营平台',
            link: '/zh/sirp/Introduction/what_is_sirp/',
            activeMatch: '/zh/sirp/'
        },
        {
            text: "更新日志",
            items: [
                {
                    text: '0.1.1 - 秩序前的混乱',
                    link: '/zh/release/0_1_1_Chaos_before_order/'
                },
                {
                    text: '0.1.0 - 让我们嗨翻全场 !',
                    link: '/zh/release/0_1_0_Let_us_rock_the_party/'
                },
            ]
        }
    ]
}

function sidebarASF(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            base: '/zh/asf/Introduction/',
            items: [
                {text: '欢迎使用', link: 'what_is_asf/'},
                // {text: '功能列表', link: 'framework/'},
            ]
        },
        {
            text: '开发环境',
            collapsed: false,
            base: '/zh/asf/Development/',
            items: [
                {text: '环境配置', link: 'environment_setup/'},
            ]
        },
        {
            text: '模块',
            collapsed: false,
            base: '/zh/asf/MODULES/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: '用户上报钓鱼邮件', link: 'ES-Rule-21-Phishing-User-Report-Mail/'},
                {text: '可疑的 C2 通讯', link: 'NDR-Rule-05-Suspect-C2-Communication/'},
            ]
        },
        {
            text: '剧本',
            collapsed: false,
            base: '/zh/asf/PLAYBOOKS/',
            items: [
                {text: '开发指南', link: 'development/'},
                {
                    text: 'Case',
                    collapsed: false,
                    items: [
                        {text: '威胁狩猎智能体', link: 'Case_Threat_Hunting_Agent/'},
                        {text: 'SOC L3 分析师智能体', link: 'Case_L3_SOC_Analyst_Agent/'},
                        {text: 'SOC L3 分析师智能体 (工具调用)', link: 'Case_L3_SOC_Analyst_Agent_With_Tools/'},
                    ]
                },
                {
                    text: 'Alert',
                    collapsed: false,
                    items: [
                        {text: '告警分析智能体', link: 'Alert_Analysis_Agent/'},
                    ]
                },
                {
                    text: 'Artifact',
                    collapsed: false,
                    items: [
                        {text: '威胁情报查询(AlienVaultOTX)', link: 'Artifact_TI_Enrichment_By_AlienVaultOTX/'},
                        {text: '威胁情报查询(Mock)', link: 'Artifact_TI_Enrichment_By_Mock/'},
                    ]
                },
            ]
        },
        {
            text: '插件',
            collapsed: false,
            base: '/zh/asf/PLUGINS/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: 'AlienVaultOTX', link: 'AlienVaultOTX/'},
                {text: 'Dify', link: 'Dify/'},
                {text: 'Embeddings', link: 'Embeddings/'},
                {text: 'Forwarder', link: 'Forwarder/'},
                {text: 'Huggingface', link: 'Huggingface/'},
                {text: 'LLM', link: 'LLM/'},
                {text: 'MCP', link: 'MCP/'},
                {text: 'Mem0', link: 'Mem0/'},
                {text: 'Mock', link: 'Mock/'},
                {text: 'Neo4j', link: 'Neo4j/'},
                {text: 'Qdrant', link: 'Qdrant/'},
                {text: 'Redis', link: 'Redis/'},
                {text: 'SIRP', link: 'SIRP/'},
            ]
        },
        {
            text: '基础智能体',
            collapsed: false,
            base: '/zh/asf/AGENTS/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: 'CMDB', link: 'CMDB/'},
                {text: 'SIEM', link: 'SIEM/'},
                {text: 'ThreatIntelligence', link: 'ThreatIntelligence/'},
                {text: 'Knowledge', link: 'Knowledge/'},
            ]
        },
        {
            text: '生产部署',
            collapsed: false,
            base: '/zh/asf/production/',
            items: [
                {text: 'SIEM 集成', link: 'siem/'},
                {text: 'ASP 部署', link: 'asf/'},
            ]
        },
    ]
}

function sidebarSIRP(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            base: '/zh/sirp/Introduction/',
            items: [
                {text: '欢迎使用', link: 'what_is_sirp/'},
                // {text: '功能列表', link: 'framework/'},
            ]
        },
        {
            text: '功能介绍',
            collapsed: false,
            base: '/zh/sirp/Feature/',
            items: [
                {text: 'Dashboard', link: 'dashboard/'},
                {text: 'Case', link: 'case/'},
                {text: 'Alert', link: 'alert/'},
                {text: 'Artifact', link: 'artifact/'},
                {text: 'Enrichment', link: 'enrichment/'},
                {text: 'Ticket', link: 'ticket/'},
                {text: 'Playbook', link: 'playbook/'},
                {text: 'Knowledge', link: 'knowledge/'},
            ]
        },
        {
            text: '安装部署',
            collapsed: false,
            base: '/zh/sirp/Deploy/',
            items: [
                {text: '安装应用', link: 'sirp_install/'},
                {text: '配置应用', link: 'sirp_config/'},
            ]
        },
        {
            text: '定制开发',
            collapsed: false,
            base: '/zh/sirp/Development/',
            items: [
                {text: '自定义字段', link: 'custom_fields/'},
                {text: '系统配置', link: 'system/'},
            ]
        },
    ]
}


export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}
