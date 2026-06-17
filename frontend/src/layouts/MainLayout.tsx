import { Outlet, NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Shield,
  Bot,
  Settings,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Sun,
  Moon,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/stores/app"

/* ── 导航分组（天元风格） ── */
const navGroups = [
  {
    label: "Workspace",
    items: [
      { title: "仪表盘", icon: LayoutDashboard, to: "/dashboard" },
      { title: "审计日志", icon: FileText, to: "/audit" },
      { title: "WAF 规则", icon: Shield, to: "/rules", count: 0 },
    ],
  },
  {
    label: "监控",
    items: [
      { title: "实时流量", icon: Activity, to: "/dashboard" },
      { title: "告警", icon: AlertTriangle, to: "/audit", count: 0 },
    ],
  },
  {
    label: "系统",
    items: [
      { title: "AI 配置", icon: Bot, to: "/ai" },
      { title: "系统设置", icon: Settings, to: "/settings" },
    ],
  },
]

const fontSizes = [12, 13, 14, 15, 16, 18, 20]

export default function MainLayout() {
  const location = useLocation()
  const { theme, setTheme } = useAppStore()

  return (
    <div className="app-layout">
      {/* ── 侧边栏（248px，天元风格） ── */}
      <aside className="flex min-w-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar py-3.5">
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 pb-3">
          <ShieldCheck className="size-6 text-primary" />
          <div className="text-sm font-semibold text-sidebar-foreground">Yuki-WAF</div>
          <div className="text-muted-foreground">/</div>
        </div>

        {/* Navigation groups */}
        {navGroups.map((group) => (
          <nav key={group.label} className="mt-2 flex flex-col gap-0.5 px-2">
            <div className="px-2 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <NavLink key={item.title} to={item.to}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="default"
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <Badge variant="secondary">{item.count}</Badge>
                    )}
                  </Button>
                </NavLink>
              )
            })}
          </nav>
        ))}

        {/* 用户块（底部，天元风格） */}
        <div className="mt-auto flex items-center gap-1 px-3 pt-3">
          <button
            className="flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted"
            type="button"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              A
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-foreground">Admin</span>
              <span className="text-xs text-muted-foreground">Ready</span>
            </span>
          </button>

          {/* 字号选择 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="字号">
                <span className="text-sm font-semibold">
                  A<span className="text-[0.65em]">A</span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-72 overflow-y-auto">
              {fontSizes.map((size) => (
                <DropdownMenuItem
                  key={size}
                  className={size === 14 ? "bg-muted font-medium" : ""}
                  onClick={() => {
                    document.documentElement.style.fontSize = `${size}px`
                  }}
                >
                  <span>{size}</span>
                  <span className="ml-1 text-muted-foreground">px</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 主题切换 */}
          <Button
            variant="ghost"
            size="icon"
            title="切换主题"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* 退出 */}
          <Button variant="ghost" size="icon" title="退出登录">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* ── 主内容区 ── */}
      <main className="flex min-w-0 flex-col overflow-hidden bg-background">
        <Outlet />
      </main>
    </div>
  )
}
