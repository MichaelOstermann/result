import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    title: "Result",
    description: "Functional utilities for success | error types.",
    base: "/result/",
    themeConfig: {
        outline: "deep",
        search: {
            provider: "local",
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/result" },
        ],
    },
    markdown: {
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
