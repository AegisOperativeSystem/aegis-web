import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://aegisos.vercel.app")
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", origin).href}\n`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
