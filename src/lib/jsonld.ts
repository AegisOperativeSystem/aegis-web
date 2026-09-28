export const jsonLdScript = (value: unknown): string =>
  JSON.stringify(value).replaceAll("<", "\\u003c")

export const breadcrumbLd = (
  site: URL,
  crumbs: { name: string; path: string }[],
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: new URL(crumb.path, site).href,
  })),
})
