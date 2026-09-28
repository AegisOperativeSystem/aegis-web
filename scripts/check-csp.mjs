import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"))
const policy = vercel.headers
  .flatMap((group) => group.headers)
  .find((header) => header.key === "Content-Security-Policy")?.value

if (!policy) {
  console.error("Content-Security-Policy is missing from vercel.json")
  process.exit(1)
}

const allowed = new Set(policy.match(/sha256-[A-Za-z0-9+/=]+/g) ?? [])
const found = new Set()

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf8")
      const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g
      let match
      while ((match = re.exec(html))) {
        const open = match[0].slice(0, match[0].indexOf(">") + 1)
        if (open.includes("application/ld+json")) continue
        found.add("sha256-" + crypto.createHash("sha256").update(match[1]).digest("base64"))
      }
    }
  }
}

walk("dist")

const missing = [...found].filter((hash) => !allowed.has(hash))
if (missing.length > 0) {
  console.error("Add these script hashes to vercel.json:")
  for (const hash of missing) console.error(hash)
  process.exit(1)
}

console.log(`CSP covers ${found.size} inline script hashes`)
