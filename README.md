# 🛡️ Yuki-WAF

**AI 赋能的流式互联网 WAF（Web Application Firewall）**

利用 OpenResty 接入流量 → Kafka 异步缓冲 → Python/Redis 滑动窗口聚合 → 用户自定义 AI API 进行时序行为审计。

---

## 架构概览

```
┌──────────────┐     ┌───────────┐     ┌─────────────────────┐     ┌─────────────┐
│   Client     │────▶│ OpenResty │────▶│      Kafka          │────▶│   Python    │
│   Traffic    │     │  Gateway  │     │  (waf.raw_requests)  │     │  Consumer   │
└──────────────┘     └───────────┘     └─────────────────────┘     └──────┬──────┘
                           │                                               │
                           │ Lua: 黑名单/限流                    Redis: 滑动窗口
                           │       ↓                                 ↓
                     ┌─────┴──────┐                          ┌──────────────┐
                     │   Redis    │                          │   AI API     │
                     │  (Counter) │                          │ (User-Defined)│
                     └────────────┘                          └──────┬───────┘
                                                                    │
                                                              ┌─────▼──────┐
                                                              │   MySQL    │
                                                              │ (持久化)   │
                                                              └─────┬──────┘
                                                                    │
                                                              ┌─────▼──────┐
                                                              │  Frontend  │
                                                              │ React + UI │
                                                              └────────────┘
```

## 目录结构

```
Yuki-WAF/
├── gateway/                  # OpenResty 网关层
│   ├── conf/nginx.conf       #   Nginx 主配置
│   └── lua/
│       ├── gateway/          #   各阶段 Lua 脚本
│       │   ├── phase_init.lua    #   worker 初始化
│       │   ├── phase_access.lua  #   请求准入（黑名单/限流）
│       │   └── phase_log.lua     #   日志采集 → Kafka
│       └── lib/              #   公共库
│           └── kafka_producer.lua
│
├── backend/                  # Python 后端
│   ├── pyproject.toml        #   项目元数据 & 依赖
│   ├── Dockerfile
│   └── app/
│       ├── main.py           #   FastAPI 入口
│       ├── core/             #   基础设施
│       │   ├── config.py         #   pydantic-settings 配置
│       │   ├── database.py       #   SQLAlchemy 异步引擎
│       │   ├── redis.py          #   Redis 客户端
│       │   └── kafka_consumer.py #   Kafka 消费者
│       ├── models/           #   ORM 模型
│       ├── schemas/          #   Pydantic Schema
│       ├── api/              #   路由
│       ├── services/         #   业务逻辑
│       └── utils/            #   工具函数
│
├── frontend/                 # React 前端（待初始化）
│   └── README.md             #   前端初始化指南
│
├── infra/                    # 基础设施配置
│   ├── migrations/           #   SQL 迁移脚本
│   │   └── 001_init.sql          #   建库建表
│   └── nginx/                #   生产 Nginx 配置
│
├── scripts/                  # 运维脚本
├── docker-compose.yml        # 开发环境一键启动
├── .env.example              # 环境变量模板
├── .gitignore
├── Makefile                  # 常用命令
└── README.md
```

## 快速开始

### 前置条件

- Docker & Docker Compose
- Python 3.11+
- Node.js 20+ & npm

### 第一步：启动基础设施

```bash
# 克隆 & 进入项目
cd Yuki-WAF

# 复制环境变量
cp .env.example .env

# 一键启动 OpenResty + Kafka + Redis + MySQL
make infra
```

### 第二步：初始化 & 启动后端

```bash
# 创建 Python 虚拟环境（推荐）
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 安装依赖
pip install -e ".[dev]"

# 启动开发服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

验证：浏览器访问 http://localhost:8000/api/health

### 第三步：初始化 & 启动前端

```bash
# 回到项目根目录
cd ..

# 用 Vite 创建 React + TS 项目
npm create vite@latest frontend -- --template react-ts
cd frontend

# 安装依赖
npm install

# 安装 Tailwind CSS 4
npm install tailwindcss @tailwindcss/vite

# 初始化 shadcn/ui
npx shadcn@latest init

# 安装常用组件
npx shadcn@latest add button card input label dialog table tabs toast select

# 安装业务依赖
npm install @tanstack/react-query zustand react-router-dom axios

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 🎉

---

## 技术选型

| 层级 | 技术 | 用途 |
|------|------|------|
| 网关 | OpenResty (Nginx + Lua) | 流量入口、实时拦截、日志采集 |
| 消息队列 | Apache Kafka (KRaft) | 流量日志异步缓冲 |
| 缓存 | Redis 7 | 滑动窗口计数器、热数据缓存 |
| 数据库 | MySQL 8 | 规则存储、审计日志持久化 |
| 后端 | Python + FastAPI | API 服务、Kafka 消费、AI 审计 |
| 前端 | Vite + React + shadcn/ui | 管理后台 |
| AI | 用户自定义 API | 时序行为审计 |

## License

[MIT](LICENSE)
