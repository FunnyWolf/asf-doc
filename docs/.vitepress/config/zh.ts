import {type DefaultTheme, defineConfig} from 'vitepress'

export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/asp/': {base: '/zh/asp/', items: sidebarASP()},
            '/zh/sirp/': {base: '/zh/sirp/', items: sidebarSIRP()},
        },

        footer: {
            // message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `版权所有 © 2024-${new Date().getFullYear()} Funnywolf`
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
                // @ts-ignore
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
            link: '/zh/asp/Introduction/what_is_asp/',
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
                    text: '0.3.0 - MCP 和 Claude Code Plugin',
                    link: '/zh/release/0_3_0_MCP_And_ClaudeCodePlugin/'
                },
                {
                    text: '0.2.0 - OCSF 和 BaseModel',
                    link: '/zh/release/0_2_0_OCSF_And_BaseModel/'
                },
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

function sidebarASP(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            base: '/zh/asp/Introduction/',
            items: [
                {text: '欢迎使用', link: 'what_is_asp/'},
            ]
        },
        {
            text: '开发环境',
            collapsed: false,
            base: '/zh/asp/Development/',
            items: [
                {text: '环境配置', link: 'environment_setup/'},
            ]
        },
        {
            text: '后台服务',
            collapsed: false,
            base: '/zh/asp/Background/',
            items: [
                {text: '总览', link: 'index/'},
                {text: '模块运行框架', link: 'module-engine/'},
                {text: 'Playbook 执行', link: 'playbook-execution/'},
                {text: '自动化分析', link: 'auto-analysis/'},
            ]
        },
        {
            text: '模块',
            collapsed: false,
            base: '/zh/asp/MODULES/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: 'AWS IAM 权限提升告警', link: 'Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy/'},
                {text: '用户上报钓鱼邮件', link: 'Mail-01-User-Report-Phishing-Mail/'},
                {text: '卷影副本删除检测', link: 'EDR-01-HOST-Vssadmin-Delete-Shadows/'},
            ]
        },
        {
            text: '剧本',
            collapsed: false,
            base: '/zh/asp/PLAYBOOKS/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: '案件调查', link: 'Investigation/'},
                {text: '知识提取', link: 'Knowledge_Extraction/'},
                {text: '威胁情报富化', link: 'Threat_Intelligence_Enrichment/'},
            ]
        },
        {
            text: '插件',
            collapsed: false,
            base: '/zh/asp/PLUGINS/',
            items: [
                {text: '开发指南', link: 'development/'},
                {text: 'AlienVaultOTX', link: 'AlienVaultOTX/'},
                {text: 'CMDB', link: 'CMDB/'},
                {
                    text: 'ClaudeCode',
                    collapsed: true,
                    base: '/zh/asp/PLUGINS/ClaudeCode/',
                    items: [
                        {text: '使用指南', link: 'index/'},
                        {
                            text: 'Agents',
                            collapsed: true,
                            base: '/zh/asp/PLUGINS/ClaudeCode/agents/',
                            items: [
                                {text: 'Case Investigator', link: 'case-investigator/'},
                                {text: 'Artifact Investigator', link: 'artifact-investigator/'},
                                {text: 'Threat Hunting', link: 'threat-hunting/'},
                            ]
                        },
                        {
                            text: 'Skills',
                            collapsed: true,
                            base: '/zh/asp/PLUGINS/ClaudeCode/skills/',
                            items: [
                                {text: 'Alert', link: 'alert/'},
                                {text: 'Artifact', link: 'artifact/'},
                                {text: 'Case', link: 'case/'},
                                {text: 'Enrichment', link: 'enrichment/'},
                                {text: 'Knowledge', link: 'knowledge/'},
                                {text: 'Module Creator', link: 'module-creator/'},
                                {text: 'Playbook', link: 'playbook/'},
                                {text: 'SIEM Index YAML', link: 'siem-index-yaml/'},
                                {text: 'SIEM Search', link: 'siem-search/'},
                                {text: 'Threat Intelligence', link: 'threat-intelligence/'},
                            ]
                        },
                    ]
                },
                {text: 'ELK', link: 'ELK/'},
                {text: 'Forwarder', link: 'Forwarder/'},
                {text: 'LLM', link: 'LLM/'},
                {text: 'MCP', link: 'MCP/'},
                {text: 'Mock', link: 'Mock/'},
                {text: 'Redis', link: 'Redis/'},
                {text: 'SIEM', link: 'SIEM/'},
                {text: 'SIRP', link: 'SIRP/'},
                {text: 'Splunk', link: 'Splunk/'},
                {text: 'ThreatIntelligence', link: 'ThreatIntelligence/'},
            ]
        }
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
                {text: 'Knowledge', link: 'knowledge/'},
                {text: 'Playbook', link: 'playbook/'},
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
                {text: '更新自定义组件', link: 'update_custom_components/'},
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
