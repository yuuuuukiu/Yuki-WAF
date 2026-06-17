import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, RefreshCw } from "lucide-react"

export default function AiConfig() {
  return (
    <>
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-sm">
          <b className="text-foreground">AI 配置</b>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">提供商</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            刷新
          </Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5 mr-1" />
            添加配置
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-background p-6">
        <Card>
          <CardHeader>
            <CardTitle>默认 AI 提供商</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="base-url">Base URL</Label>
              <Input
                id="base-url"
                placeholder="https://api.openai.com/v1"
                defaultValue="https://api.openai.com/v1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="sk-..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">模型</Label>
              <Input id="model" placeholder="gpt-4o-mini" defaultValue="gpt-4o-mini" />
            </div>
            <Button>保存配置</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
