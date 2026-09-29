(() => {
  const meta = document.querySelector('meta[name="theme-color"]')
  try {
    const stored = localStorage.getItem("aegis-theme")
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark"
    document.documentElement.dataset.theme = theme
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f4ef" : "#090d12")
  } catch {
    document.documentElement.dataset.theme = "dark"
  }
})()
