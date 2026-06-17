import { create } from "zustand"

interface AppState {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  toggleTheme: () => void
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.setAttribute("data-theme", theme)
  localStorage.setItem("yuki-waf-theme", theme)
}

export const useAppStore = create<AppState>((set) => ({
  theme: (() => {
    const saved = localStorage.getItem("yuki-waf-theme") as "light" | "dark" | null
    if (saved) {
      applyTheme(saved)
      return saved
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDark) applyTheme("dark")
    return prefersDark ? "dark" : "light"
  })(),
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light"
      applyTheme(next)
      return { theme: next }
    }),
}))
