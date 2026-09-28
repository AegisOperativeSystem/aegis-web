import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const wiki = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    section: z.enum(["Start", "Install", "Desktop", "System"]),
    order: z.number().int(),
    updated: z.coerce.date(),
  }),
})

export const collections = { wiki }
