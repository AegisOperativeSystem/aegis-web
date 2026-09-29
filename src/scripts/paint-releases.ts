import { formatBytes, formatReleaseDate, type IsoRelease } from "../lib/releases"
import { firmwareFor } from "../lib/vbox"

const appendText = (parent: HTMLElement, tag: string, className: string, text: string) => {
  const node = document.createElement(tag)
  node.className = className
  node.textContent = text
  parent.append(node)
  return node
}

const renderCard = (release: IsoRelease, featured: boolean): HTMLElement => {
  const card = document.createElement("article")
  card.className = "rounded-2xl border border-line bg-elev p-6"
  appendText(
    card,
    "p",
    "text-sm font-semibold text-accent",
    featured ? "Latest image" : release.version,
  )
  appendText(card, "h2", "mt-2 text-2xl font-semibold tracking-tight", release.name)
  appendText(
    card,
    "p",
    "mt-2 text-sm text-muted",
    `${release.version} · ${formatReleaseDate(release.published)} · ${formatBytes(release.size)}`,
  )
  const actions = document.createElement("div")
  actions.className = "mt-6 flex flex-wrap gap-3"
  const link = document.createElement("a")
  link.className = "btn btn-primary"
  link.href = release.url
  link.textContent = featured ? "Download ISO" : "Download"
  actions.append(link)
  if (featured) {
    const machine = document.createElement("button")
    machine.type = "button"
    machine.className = "btn btn-secondary"
    machine.dataset.vbox = release.name
    machine.dataset.firmware = firmwareFor(release.version)
    machine.textContent = "VirtualBox machine"
    actions.append(machine)
  }
  card.append(actions)
  if (release.digest) {
    const block = document.createElement("div")
    block.className = "mt-6"
    appendText(block, "p", "text-sm font-semibold", "SHA-256")
    const code = document.createElement("code")
    code.className = "mt-2 block overflow-x-auto font-mono text-xs text-muted"
    code.textContent = release.digest
    block.append(code)
    const button = document.createElement("button")
    button.type = "button"
    button.className = "btn btn-secondary mt-4"
    button.dataset.copy = release.digest
    button.textContent = "Copy checksum"
    block.append(button)
    card.append(block)
  }
  return card
}

export const paintReleases = (root: HTMLElement, releases: IsoRelease[]) => {
  root.replaceChildren()
  if (releases.length === 0) {
    const empty = document.createElement("div")
    empty.className = "rounded-2xl border border-line bg-elev p-6"
    appendText(empty, "h2", "text-2xl font-semibold tracking-tight", "No image published yet")
    appendText(
      empty,
      "p",
      "mt-3 max-w-2xl text-muted",
      "Aegis OS uploads a bootable ISO when a version tag is pushed from aegis-os. This page lists every .iso asset on that GitHub release list.",
    )
    const link = document.createElement("a")
    link.className = "btn btn-secondary mt-6"
    link.href = "https://github.com/AegisOperativeSystem/aegis-os/releases"
    link.textContent = "Open GitHub releases"
    empty.append(link)
    root.append(empty)
    return
  }
  const latest = document.createElement("div")
  latest.append(renderCard(releases[0], true))
  root.append(latest)
  if (releases.length < 2) return
  const older = document.createElement("section")
  older.className = "mt-8"
  const heading = document.createElement("h2")
  heading.className = "text-xl font-semibold"
  heading.textContent = "Earlier images"
  older.append(heading)
  const list = document.createElement("div")
  list.className = "mt-4 grid gap-4"
  for (const release of releases.slice(1)) list.append(renderCard(release, false))
  older.append(list)
  root.append(older)
}

export const bindCopy = (root: HTMLElement) => {
  root.addEventListener("click", async (event) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const button = target.closest("[data-copy]")
    if (!(button instanceof HTMLButtonElement)) return
    const value = button.dataset.copy
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      const previous = button.textContent
      button.textContent = "Copied"
      window.setTimeout(() => {
        button.textContent = previous
      }, 1600)
    } catch {
      button.textContent = "Copy failed"
    }
  })
}
