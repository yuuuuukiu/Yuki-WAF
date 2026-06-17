import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

export default function Rules() {
  return (
    <>
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <b className="text-foreground">WAF 规则</b>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">全部</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            刷新
          </Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5 mr-1" />
            新建规则
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-background p-6">
        <Card>
          <CardContent className="flex flex-col items-center gap-1 py-16">
            <div className="text-sm font-medium text-foreground">没有规则</div>
            <div className="text-xs text-muted-foreground">
              点击「新建规则」添加 IP 黑白名单、频率限制等
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
