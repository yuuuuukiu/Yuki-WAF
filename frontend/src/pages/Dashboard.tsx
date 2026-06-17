import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Activity, AlertTriangle, Bot, RefreshCw } from "lucide-react"

const stats = [
  {
    title: "今日请求总量",
    value: "—",
    icon: Activity,
    description: "网关处理的 HTTP 请求数",
  },
  {
    title: "拦截次数",
    value: "—",
    icon: Shield,
    description: "被 WAF 规则拦截的请求",
  },
  {
    title: "高风险告警",
    value: "—",
    icon: AlertTriangle,
    description: "AI 判定为 high / critical",
  },
  {
    title: "AI 审计完成",
    value: "—",
    icon: Bot,
    description: "已完成 AI 行为分析的会话数",
  },
]

export default function Dashboard() {
  return (
    <>
      {/* 页头（天元风格） */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <b className="text-foreground">仪表盘</b>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">概览</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            刷新
          </Button>
        </div>
      </header>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.title}
                </CardTitle>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>实时流量</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              🚧 图表待接入 — 后端 Kafka 消费者就绪后，此处将展示实时请求趋势和风险分布。
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
