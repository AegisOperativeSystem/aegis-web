import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL("https://aegisos.vercel.app")).origin
  const body = `# Aegis OS

> Ultra-lightweight Arch Linux for x86_64 UEFI PCs.

## Pages

- [Home](${origin}/)
- [Download](${origin}/download)
- [Install](${origin}/install)
- [Desktop](${origin}/desktop)
- [Kernel](${origin}/kernel)
- [Packages](${origin}/packages)
- [Wiki](${origin}/wiki)
- [Architecture](${origin}/architecture)
- [Security](${origin}/security)
- [FAQ](${origin}/faq)

## Source

- https://github.com/AegisOperativeSystem/aegis-os
- https://github.com/AegisOperativeSystem/aegis-kernel
- https://github.com/AegisOperativeSystem/aegis-pkgs
`
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
