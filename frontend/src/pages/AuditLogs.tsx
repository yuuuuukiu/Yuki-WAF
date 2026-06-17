import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

const riskColors: Record<string, string> = {
  safe: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700",
  low: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700",
  high: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700",
  critical: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700",
}

const filters = [
  { label: "全部", value: "" },
  { label: "高风险", value: "high" },
  { label: "中风险", value: "medium" },
  { label: "低风险", value: "low" },
  { label: "安全", value: "safe" },
]

export default function AuditLogs() {
  return (
    <>
      {/* 页头 */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <b className="text-foreground">审计日志</b>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">全部</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            刷新
          </Button>
        </div>
      </header>

      {/* 筛选栏 */}
      <div className="flex items-center gap-2 border-b border-border bg-card px-5 py-2">
        {filters.map((f) => (
          <Button key={f.value} variant="ghost" size="sm">
            {f.label}
          </Button>
        ))}
        <div className="ml-auto text-xs text-muted-foreground">
          排序 <b className="text-foreground">最近请求</b>
        </div>
      </div>

      {/* 内容 */}
      <div className="flex-1 overflow-y-auto bg-background p-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>时间</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>请求</TableHead>
                  <TableHead>状态码</TableHead>
                  <TableHead>风险等级</TableHead>
                  <TableHead>AI 结论</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-sm font-medium text-foreground">暂无数据</div>
                      <div className="text-xs text-muted-foreground">
                        后端 Kafka 消费 + AI 审计流程就绪后，日志将自动展示
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
