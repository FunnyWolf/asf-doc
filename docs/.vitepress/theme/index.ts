import DefaultTheme from "vitepress/theme";
import 'virtual:group-icons.css'
import './styles.css'
import './styles/custom.css'
import Layout from "./Layout.vue";
import Features from './components/Features.vue'
import Hero from './components/Hero.vue'

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp: ({app}) => {
        app.component('Features', Features)
        app.component('Hero', Hero)
    }
};
