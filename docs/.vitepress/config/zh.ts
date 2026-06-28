import {type DefaultTheme, defineConfig} from 'vitepress'

export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/asp/': {base: '/zh/asp/', items: sidebarASP()},
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
            text: '产品文档',
            link: '/zh/asp/overview/',
            activeMatch: '/zh/asp/'
        },
        {
            text: "更新日志",
            items: [
                {
                    text: '0.4.0 - I always have a choice',
                    link: '/zh/release/0_4_0_I_always_have_a_choice/'
                },
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
            text: '概览',
            collapsed: false,
            base: '/zh/asp/overview/',
            items: [
                {text: '什么是 ASP', link: 'index/'},
                {text: '产品架构', link: 'architecture/'},
                {text: '术语表', link: 'glossary/'},
            ]
        },
        {
            text: '快速开始',
            collapsed: false,
            base: '/zh/asp/quick-start/',
            items: [
                {text: '部署', link: 'deployment/'},
                {text: '首次登录', link: 'first-login/'},
                {text: '基础配置', link: 'basic-configuration/'},
                {text: '重启 & 运维', link: 'operations/'},
                {text: '升级', link: 'upgrade/'},
            ]
        },
        {
            text: '工作台功能',
            collapsed: false,
            base: '/zh/asp/workspace/',
            items: [
                {text: 'Dashboard', link: 'dashboard/'},
                {text: 'Case', link: 'case/'},
                {text: 'Alert', link: 'alert/'},
                {text: 'Artifact', link: 'artifact/'},
                {text: 'Enrichment', link: 'enrichment/'},
                {text: 'Knowledge', link: 'knowledge/'},
                {text: 'Playbook', link: 'playbook/'},
                {text: 'Inbox', link: 'inbox/'},
                {text: 'Audit Log', link: 'audit-log/'},
                {text: '个人中心', link: 'personal-center/'},
            ]
        },
        {
            text: '系统设置',
            collapsed: false,
            base: '/zh/asp/settings/',
            items: [
                {text: '总览', link: 'index/'},
                {text: '用户管理', link: 'users/'},
                {text: 'LLM Provider', link: 'llm-provider/'},
                {text: 'SIEM', link: 'siem/'},
                {text: '威胁情报', link: 'threat-intelligence/'},
                {text: 'LDAP', link: 'ldap/'},
                {text: 'Runtime', link: 'runtime/'},
                {text: 'Tags', link: 'tags/'},
            ]
        },
        {
            text: '集成',
            collapsed: false,
            base: '/zh/asp/integrations/',
            items: [
                {text: '总览', link: 'index/'},
                {text: 'MCP', link: 'mcp/'},
                {
                    text: 'ClaudeCode 插件',
                    collapsed: false,
                    base: '/zh/asp/integrations/claude-code/',
                    items: [
                        {text: '使用指南', link: 'index/'},
                        {
                            text: 'Agents',
                            collapsed: true,
                            base: '/zh/asp/integrations/claude-code/agents/',
                            items: [
                                {text: 'Case Investigator', link: 'case-investigator/'},
                                {text: 'Artifact Investigator', link: 'artifact-investigator/'},
                                {text: 'Threat Hunting', link: 'threat-hunting/'},
                            ]
                        },
                        {
                            text: 'Skills',
                            collapsed: true,
                            base: '/zh/asp/integrations/claude-code/skills/',
                            items: [
                                {text: 'Alert', link: 'alert/'},
                                {text: 'Artifact', link: 'artifact/'},
                                {text: 'Case', link: 'case/'},
                                {text: 'Enrichment', link: 'enrichment/'},
                                {text: 'Knowledge', link: 'knowledge/'},
                                {text: 'Comment', link: 'comment/'},
                                {text: 'CMDB', link: 'cmdb/'},
                                {text: 'Module Creator', link: 'module-creator/'},
                                {text: 'Playbook', link: 'playbook/'},
                                {text: 'Playbook Creator', link: 'playbook-creator/'},
                                {text: 'SIEM Index YAML', link: 'siem-index-yaml/'},
                                {text: 'SIEM Search', link: 'siem-search/'},
                                {text: 'SIEM Rule', link: 'siem-rule/'},
                                {text: 'Threat Intelligence', link: 'threat-intelligence/'},
                            ]
                        },
                    ]
                },
            ]
        },
        {
            text: '定制开发',
            collapsed: false,
            base: '/zh/asp/development/',
            items: [
                {text: '总览', link: 'index/'},
                {text: '开发环境搭建', link: 'environment-setup/'},
                {text: 'Mock 数据', link: 'mock-data/'},
                {
                    text: '告警接入',
                    collapsed: false,
                    base: '/zh/asp/development/alert-ingestion/',
                    items: [
                        {text: '总览', link: 'index/'},
                        {text: 'Splunk Webhook', link: 'splunk-webhook/'},
                        {text: 'Kibana Webhook', link: 'kibana-webhook/'},
                        {text: 'ELK Index Action', link: 'elk-index-action/'},
                    ]
                },
                {text: 'SIEM YAML', link: 'siem-yaml/'},
                {text: 'Module 开发', link: 'module-examples/'},
                {text: 'Playbook 开发', link: 'playbook/'},
                {text: 'Custom Console', link: 'custom-console/'},
                {
                    text: 'Custom Examples',
                    collapsed: false,
                    base: '/zh/asp/development/custom-examples/',
                    items: [
                        {text: '总览', link: 'index/'},
                        {text: 'Custom Modules', link: 'modules/'},
                        {text: 'Custom Playbooks', link: 'playbooks/'},
                    ]
                },
            ]
        }
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
