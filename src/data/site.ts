export const siteName = "Aegis OS"

export const siteDescription =
  "Aegis OS is an ultra-lightweight Arch-based operating system with a GTK4 desktop, a graphical installer, and a tuned longterm kernel."

export const githubOrg = "https://github.com/AegisOperativeSystem"

export const repos = [
  {
    name: "aegis-os",
    href: `${githubOrg}/aegis-os`,
    role: "Live image, desktop, and installer",
  },
  {
    name: "aegis-kernel",
    href: `${githubOrg}/aegis-kernel`,
    role: "linux-aegis 6.18 longterm package",
  },
  {
    name: "aegis-pkgs",
    href: `${githubOrg}/aegis-pkgs`,
    role: "PKGBUILDs and the pacman repository",
  },
] as const

export const nav = [
  { href: "/download", label: "Download" },
  { href: "/desktop", label: "Desktop" },
  { href: "/kernel", label: "Kernel" },
  { href: "/packages", label: "Packages" },
  { href: "/wiki", label: "Wiki" },
  { href: "/faq", label: "FAQ" },
] as const

export const footerDocs = [
  { href: "/features", label: "Features" },
  { href: "/install", label: "Install" },
  { href: "/wiki", label: "Wiki" },
  { href: "/architecture", label: "Architecture" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
  { href: "/releases", label: "Releases" },
  { href: "/contribute", label: "Contribute" },
] as const

export const isoReleasesApi =
  "https://api.github.com/repos/AegisOperativeSystem/aegis-os/releases"

export const isoReleasesPage =
  "https://github.com/AegisOperativeSystem/aegis-os/releases"

export const packageRepo =
  "https://github.com/AegisOperativeSystem/aegis-pkgs/releases/download/x86_64"

export const integrationGuide =
  "https://github.com/AegisOperativeSystem/aegis-os/blob/main/docs/integration.md"
