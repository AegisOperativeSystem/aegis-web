import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
const site =
  process.env.SITE ??
  (productionHost ? `https://${productionHost}` : "https://aegisos.vercel.app")

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/404") &&
        !page.endsWith("/404/") &&
        !page.endsWith("/rss.xml") &&
        !page.endsWith("/robots.txt") &&
        !page.endsWith("/llms.txt"),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
