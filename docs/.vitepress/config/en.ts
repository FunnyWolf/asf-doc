import {type DefaultTheme, defineConfig} from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/asf/': {base: '/asf/', items: sidebarASF()},
            '/sirp/': {base: '/sirp/', items: sidebarSIRP()},
        },

        footer: {
            // message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `Copyright © 2020-${new Date().getFullYear()} Funnywolf`
        },

        docFooter: {
            prev: 'Previous page',
            next: 'Next page'
        },

        outline: {
            label: 'On this page'
        },

        lastUpdated: {
            text: 'Last updated on',
            formatOptions: {
                dateStyle: 'short',
                // timeStyle: 'short'
            }
        },

        langMenuLabel: 'Languages',
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        skipToContentLabel: 'Skip to content'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'FRAMEWORK',
            link: '/asp/Introduction/what_is_asp/',
            activeMatch: '/asf/'
        },
        {
            text: 'SIRP',
            link: '/sirp/Introduction/what_is_sirp/',
            activeMatch: '/sirp/'
        },
        {
            text: "CHANGELOG",
            items: [
                {
                    text: '0.3.0 - MCP and Claude Code Plugin',
                    link: '/release/0_3_0_MCP_And_ClaudeCodePlugin/'
                },
                {
                    text: '0.2.0 - OCSF And BaseModel',
                    link: '/release/0_2_0_OCSF_And_BaseModel/'
                },
                {
                    text: '0.1.1 - Chaos before order',
                    link: '/release/0_1_1_Chaos_before_order/'
                },
                {
                    text: '0.1.0 - Let`s Rock The Party !',
                    link: '/release/0_1_0_Let_us_rock_the_party/'
                },
            ]
        }
    ]
}

function sidebarASF(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            base: '/asp/Introduction/',
            items: [
                {text: 'Welcome', link: 'what_is_asp/'},
            ]
        },
        {
            text: 'Development Environment',
            collapsed: false,
            base: '/asp/Development/',
            items: [
                {text: 'Environment Setup', link: 'environment_setup/'},
            ]
        },
        {
            text: 'Modules',
            collapsed: false,
            base: '/asp/MODULES/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'AWS IAM Privilege Escalation Alert', link: 'Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy/'},
                {text: 'User-reported Phishing Email', link: 'ES-Rule-21-Phishing-User-Report-Mail/'},
                {text: 'Suspicious C2 Communication', link: 'NDR-Rule-05-Suspect-C2-Communication/'},
            ]
        },
        {
            text: 'Playbooks',
            collapsed: false,
            base: '/asp/PLAYBOOKS/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {
                    text: 'Case',
                    collapsed: false,
                    items: [
                        {text: 'Threat Hunting Agent', link: 'Case_Threat_Hunting_Agent/'},
                        {text: 'SOC L3 Analyst Agent', link: 'Case_L3_SOC_Analyst_Agent/'},
                        {text: 'SOC L3 Analyst Agent (Tool Calling)', link: 'Case_L3_SOC_Analyst_Agent_With_Tools/'},
                    ]
                },
                {
                    text: 'Alert',
                    collapsed: false,
                    items: [
                        {text: 'Alert Analysis Agent', link: 'Alert_Analysis_Agent/'},
                    ]
                },
                {
                    text: 'Artifact',
                    collapsed: false,
                    items: [
                        {text: 'TI Enrichment By AlienVaultOTX', link: 'Artifact_TI_Enrichment_By_AlienVaultOTX/'},
                        {text: 'TI Enrichment By Mock', link: 'Artifact_TI_Enrichment_By_Mock/'},
                    ]
                },
            ]
        },
        {
            text: 'Plugins',
            collapsed: false,
            base: '/asp/PLUGINS/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'AlienVaultOTX', link: 'AlienVaultOTX/'},
                {text: 'Embeddings', link: 'Embeddings/'},
                {text: 'Forwarder', link: 'Forwarder/'},
                {text: 'Huggingface', link: 'Huggingface/'},
                {text: 'LLM', link: 'LLM/'},
                {text: 'MCP', link: 'MCP/'},
                {text: 'Mock', link: 'Mock/'},
                {text: 'Qdrant', link: 'Qdrant/'},
                {text: 'Redis', link: 'Redis/'},
                {text: 'SIEM', link: 'SIEM/'},
                {text: 'SIRP', link: 'SIRP/'},
            ]
        },
        {
            text: 'Basic Agents',
            collapsed: false,
            base: '/asp/AGENTS/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'CMDB', link: 'CMDB/'},
                {text: 'SIEM', link: 'SIEM/'},
                {text: 'ThreatIntelligence', link: 'ThreatIntelligence/'},
                {text: 'Knowledge', link: 'Knowledge/'},
            ]
        },
        {
            text: 'Production Deployment',
            collapsed: false,
            base: '/asp/production/',
            items: [
                {text: 'SIEM Integration', link: 'siem/'},
                {text: 'ASP Deployment', link: 'asp/'},
            ]
        },
    ]
}

function sidebarSIRP(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            base: '/sirp/Introduction/',
            items: [
                {text: 'Welcome', link: 'what_is_sirp/'},
                // {text: 'Features', link: 'framework/'},
            ]
        },
        {
            text: 'Features',
            collapsed: false,
            base: '/sirp/Feature/',
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
            text: 'Installation & Deployment',
            collapsed: false,
            base: '/sirp/Deploy/',
            items: [
                {text: 'Install Application', link: 'sirp_install/'},
                {text: 'Configure Application', link: 'sirp_config/'},
            ]
        },
        {
            text: 'Custom Development',
            collapsed: false,
            base: '/sirp/Development/',
            items: [
                {text: 'Custom Fields', link: 'custom_fields/'},
                {text: 'System Configuration', link: 'system/'},
            ]
        },
    ]
}


export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    en: {
        placeholder: 'Search documentation',
        translations: {
            button: {
                buttonText: 'Search documentation',
                buttonAriaLabel: 'Search documentation'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: 'Clear search query',
                    resetButtonAriaLabel: 'Clear search query',
                    cancelButtonText: 'Cancel',
                    cancelButtonAriaLabel: 'Cancel'
                },
                startScreen: {
                    recentSearchesTitle: 'Recent searches',
                    noRecentSearchesText: 'No recent searches',
                    saveRecentSearchButtonTitle: 'Save to recent searches',
                    removeRecentSearchButtonTitle: 'Remove from recent searches',
                    favoriteSearchesTitle: 'Favorites',
                    removeFavoriteSearchButtonTitle: 'Remove from favorites'
                },
                errorScreen: {
                    titleText: 'Unable to fetch results',
                    helpText: 'You might need to check your network connection'
                },
                footer: {
                    selectText: 'Select',
                    navigateText: 'Navigate',
                    closeText: 'Close',
                    searchByText: 'Search by'
                },
                noResultsScreen: {
                    noResultsText: 'No results found',
                    suggestedQueryText: 'You can try searching for',
                    reportMissingResultsText: 'Think this query should have results?',
                    reportMissingResultsLinkText: 'Click to feedback'
                }
            }
        }
    }
}