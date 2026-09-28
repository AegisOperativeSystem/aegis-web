import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

export const GET: APIRoute = async (context) => {
  const articles = (await getCollection("wiki")).sort((a, b) => a.data.order - b.data.order)
  return rss({
    title: "Aegis OS wiki",
    description: "Guides for installing and using Aegis OS.",
    site: context.site ?? "https://aegisos.vercel.app",
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      link: `/wiki/${article.id}`,
      pubDate: article.data.updated,
    })),
  })
}
