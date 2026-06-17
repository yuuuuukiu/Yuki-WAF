import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Settings() {
  return (
    <>
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <b className="text-foreground">系统设置</b>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">通用</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-background p-6">
        <Card>
          <CardHeader>
            <CardTitle>通用设置</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              🚧 设置页面待实现 — 将包含用户管理、通知配置、系统信息等。
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
