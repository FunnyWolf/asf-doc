import {type DefaultTheme, defineConfig} from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'AI SOC FRAMEWORK',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/guide/': {base: '/zh/guide/', items: sidebarGuide()},
            '/zh/module/': {base: '/zh/module/', items: sidebarModule()},
            '/zh/training/': {base: '/zh/training/', items: sidebarTraining()},
            '/zh/policies/': {base: '/zh//policies/', items: sidebarPolicies()}
        },

        footer: {
            message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `版权所有 © 2020-${new Date().getFullYear()} Viper Red Team Platform`
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
                timeStyle: 'medium'
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
            text: '指南',
            link: '/zh/guide/welcome_to_viper',
            activeMatch: '/zh/guide/'
        },
        {
            text: '模块',
            link: '/zh/module/index',
            activeMatch: '/zh/module/'
        },
        {
            text: '教程',
            link: '/zh/training/index',
            activeMatch: '/zh/training/'
        },
        {
            text: "更新日志",
            items: [
                // {
                //     text: '3.1.2 - 渗透测试智能体和MCP服务器',
                //     link: '/zh/release/3_1_2_Pentest_Agent_and_MCP_server'
                // },
                {
                    text: '3.1.1 - 混乱是阶梯',
                    link: '/zh/release/3_1_1_Chaos_is_a_ladder'
                },

            ]
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            items: [
                {text: '欢迎使用', link: 'welcome_to_viper'},
                {text: '快速开始', link: 'getting_start'},
            ]
        },
        {
            text: '框架',
            collapsed: false,
            items: [
                {text: '主机信息', link: 'information'},
                {text: '', link: ''},
            ]
        },
        {
            text: '模块',
            collapsed: false,
            items: [
                {text: '许可管理', link: 'license'},
                {text: '', link: ''},
            ]
        },
        {
            text: 'SIRP',
            collapsed: false,
            items: [
                {text: '许可管理', link: 'license'},
                {text: '', link: ''},
            ]
        },
        {
            text: '其他',
            collapsed: false,
            items: [
                {text: '更新版本', link: 'update_version'},
            ]
        }
    ]
}

function sidebarModule(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '智能体',
            collapsed: false,
            items: [
                {text: '渗透测试智能体', link: 'AI_Agent_Session_LangGraph_Pentest'},
            ]
        },
        {
            text: '资源部署',
            collapsed: false,
            items: [
                {text: '随机身份生成(中文)', link: 'ResourceDevelopment_EstablishAccounts_RGPerson'},
            ]
        },
        {
            text: '横向移动',
            collapsed: false,
            items: [

                {text: 'MS17-010扫描', link: 'LateralMovement_ExploitationOfRemoteServices_AuxiliaryMs17010'},
                // {text: 'MS17-010利用(CSharp)', link: 'LateralMovement_ExploitationOfRemoteServices_MS17010'},

            ]
        },
        {
            text: '数据采集',
            collapsed: false,
            items: [
                {text: '打包压缩目录并回传', link: 'Collection_ArchiveCollectedData_ArchiveViaCustomMethod'},
                {text: '分卷压缩目录/文件(7z)', link: 'Collection_ArchiveCollectedData_ArchiveViaCustomMethod_7z'},
            ]
        },
    ]
}

function sidebarTraining(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '熟悉Viper',
            collapsed: false,
            items: [
                {text: '获取权限', link: 'first_session/first_session'},
            ]
        },
        {
            text: '高阶技巧',
            collapsed: false,
            items: [
                {text: '多级内网渗透(gost&viper)', link: 'multi_level_intranet_penetration_gost_viper'},

            ]
        },
        {
            text: 'Blog',
            collapsed: false,
            items: [
                {text: 'Viper开源图形化内网渗透工具安装与入门指南', link: 'viper_open_source_graphical_intrAnet_penetration_tool_installation_and_beginner_guide'},
            ]
        },
    ]
}


function sidebarPolicies(): DefaultTheme.SidebarItem[] {
    return [
        {text: '隐私权条款', link: 'privacy_policy'},
        {text: '服务协议', link: 'terms_of_service'},
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
