import {type DefaultTheme, defineConfig} from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'AI SOC FRAMEWORK',

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
            text: 'AI SOC FRAMEWORK',
            link: '/zh/asf/framework/',
            activeMatch: '/zh/asf/'
        },
        {
            text: 'SIRP',
            link: '/zh/sirp/index/',
            activeMatch: '/zh/sirp/'
        },
        // {
        //     text: "更新日志",
        //     items: [
        //         // {
        //         //     text: '3.1.2 - 渗透测试智能体和MCP服务器',
        //         //     link: '/zh/release/3_1_2_Pentest_Agent_and_MCP_server'
        //         // },
        //         {
        //             text: '3.1.1 - 混乱是阶梯',
        //             link: '/zh/release/3_1_1_Chaos_is_a_ladder'
        //         },
        //
        //     ]
        // }
    ]
}

function sidebarASF(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '功能介绍',
            collapsed: false,
            items: [
                {text: 'Framework', link: 'framework/'},
                // { text: 'MODULES', link: 'module/' },
                // { text: 'PLAYBOOKS', link: 'playbook/' },
                // { text: 'PLUGINS', link: 'plugin/' },
            ]
        },
        {
            text: '开发环境',
            collapsed: false,
            items: [
                {text: '环境配置', link: 'environment_setup/'},
            ]
        },
        {
            text: 'MODULES',
            collapsed: false,
            base: '/zh/asf/MODULES/',
            items: [
                {text: '开发文档', link: 'development/'},
                {text: 'ES-Rule-21-Phishing_user_report_mail', link: 'ES-Rule-21-Phishing_user_report_mail/'},
                {text: 'ES-Rule-22-Phishing_user_report_mail', link: 'ES-Rule-22-Phishing_user_report_mail/'},
            ]
        },
        {
            text: 'PLAYBOOKS',
            collapsed: false,
            base: '/zh/asf/PLAYBOOKS/',
            items: [
                {text: '开发文档', link: 'development/'},
                {text: 'Alert_Suggestion_Gen_By_LLM', link: 'Alert_Suggestion_Gen_By_LLM/'},
                {text: 'Artifact_TI_Enrichment_Update', link: 'Artifact_TI_Enrichment_Update/'},
                {text: 'Case_Suggestion_Gen_By_LLM', link: 'Case_Suggestion_Gen_By_LLM/'},
                {text: 'TI_Artifact_query_mock', link: 'TI_Artifact_query_mock/'},
            ]
        },
        {
            text: 'PLUGINS',
            collapsed: false,
            base: '/zh/asf/PLUGINS/',
            items: [
                {text: '开发文档', link: 'development/'},
                {text: 'Dify', link: 'Dify/'},
                {text: 'LLM', link: 'LLM/'},
                {text: 'SIRP', link: 'SIRP/'},
            ]
        },
        {
            text: '生产部署',
            collapsed: false,
            base: '/zh/asf/production/',
            items: [
                {text: 'SIEM', link: 'siem/'},
                {text: 'ASF', link: 'asf/'},
            ]
        },
    ]
}

function sidebarSIRP(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '功能介绍',
            collapsed: false,
            items: [
                {text: 'Dashboard', link: 'dashboard/'},
                {text: 'Case', link: 'case/'},
                {text: 'Alert', link: 'alert/'},
                {text: 'Artifact', link: 'artifact/'},
                {text: 'Playbook', link: 'playbook/'},
                {text: 'System', link: 'system/'},
                {text: 'Workflow', link: 'workflow/'},
            ]
        },
        {
            text: '安装部署',
            collapsed: false,
            items: [
                {text: '安装应用', link: 'sirp_install/'},
                {text: '配置应用', link: 'sirp_config/'},
            ]
        },
        {
            text: '定制开发',
            collapsed: false,
            items: [
                {text: '自定义字段', link: 'custom_fields'},
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
