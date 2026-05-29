import {type DefaultTheme, defineConfig} from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    description: 'Agentic SOC Platform',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/asp/': {base: '/asp/', items: sidebarASP()},
            '/sirp/': {base: '/sirp/', items: sidebarSIRP()},
        },

        footer: {
            // message: '<a href="./policies/terms_of_service">Terms</a> · <a href="./policies/privacy_policy">Privacy</a>',
            copyright: `Copyright © 2024-${new Date().getFullYear()} Funnywolf`
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
                // @ts-ignore
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
            text: 'Framework',
            link: '/asp/Introduction/what_is_asp/',
            activeMatch: '/asp/'
        },
        {
            text: 'SIRP',
            link: '/sirp/Introduction/what_is_sirp/',
            activeMatch: '/sirp/'
        },
        {
            text: "Changelog",
            items: [
                {
                    text: '0.3.0 - MCP and Claude Code Plugin',
                    link: '/release/0_3_0_MCP_And_ClaudeCodePlugin/'
                },
                {
                    text: '0.2.0 - OCSF and BaseModel',
                    link: '/release/0_2_0_OCSF_And_BaseModel/'
                },
                {
                    text: '0.1.1 - Chaos before order',
                    link: '/release/0_1_1_Chaos_before_order/'
                },
                {
                    text: '0.1.0 - Let`s Rock The Party!',
                    link: '/release/0_1_0_Let_us_rock_the_party/'
                },
            ]
        }
    ]
}

function sidebarASP(): DefaultTheme.SidebarItem[] {
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
            text: 'Background Services',
            collapsed: false,
            base: '/asp/Background/',
            items: [
                {text: 'Overview', link: 'index/'},
                {text: 'Module Engine', link: 'module-engine/'},
                {text: 'Playbook Execution', link: 'playbook-execution/'},
                {text: 'Auto Analysis', link: 'auto-analysis/'},
            ]
        },
        {
            text: 'Modules',
            collapsed: false,
            base: '/asp/MODULES/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'AWS IAM Privilege Escalation', link: 'Cloud-01-AWS-IAM-Privilege-Escalation-via-AttachUserPolicy/'},
                {text: 'Phishing Mail Detection', link: 'Mail-01-User-Report-Phishing-Mail/'},
                {text: 'Shadow Copy Deletion', link: 'EDR-01-HOST-Vssadmin-Delete-Shadows/'},
            ]
        },
        {
            text: 'Playbooks',
            collapsed: false,
            base: '/asp/PLAYBOOKS/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'Investigation', link: 'Investigation/'},
                {text: 'Knowledge Extraction', link: 'Knowledge_Extraction/'},
                {text: 'Threat Intelligence Enrichment', link: 'Threat_Intelligence_Enrichment/'},
            ]
        },
        {
            text: 'Plugins',
            collapsed: false,
            base: '/asp/PLUGINS/',
            items: [
                {text: 'Development Guide', link: 'development/'},
                {text: 'AlienVaultOTX', link: 'AlienVaultOTX/'},
                {text: 'CMDB', link: 'CMDB/'},
                {
                    text: 'ClaudeCode',
                    collapsed: true,
                    base: '/asp/PLUGINS/ClaudeCode/',
                    items: [
                        {text: 'Usage Guide', link: 'index/'},
                        {
                            text: 'Agents',
                            collapsed: true,
                            base: '/asp/PLUGINS/ClaudeCode/agents/',
                            items: [
                                {text: 'Case Investigator', link: 'case-investigator/'},
                                {text: 'Artifact Investigator', link: 'artifact-investigator/'},
                                {text: 'Threat Hunting', link: 'threat-hunting/'},
                            ]
                        },
                        {
                            text: 'Skills',
                            collapsed: true,
                            base: '/asp/PLUGINS/ClaudeCode/skills/',
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
            text: 'Introduction',
            collapsed: false,
            base: '/sirp/Introduction/',
            items: [
                {text: 'Welcome', link: 'what_is_sirp/'},
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
                {text: 'Knowledge', link: 'knowledge/'},
                {text: 'Playbook', link: 'playbook/'},
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
