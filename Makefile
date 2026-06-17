# ============================================================
#  Yuki-WAF  — Makefile  (开发环境常用命令)
# ============================================================

.PHONY: help up down logs infra backend frontend install

help: ## 显示帮助
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# ──────────── Infrastructure ────────────

infra: ## 启动基础设施 (Kafka + Redis + MySQL + Gateway)
	docker compose up -d

up: infra ## 同 infra

down: ## 停止所有容器
	docker compose down

logs: ## 查看所有容器日志
	docker compose logs -f --tail=100

infra-clean: ## 停止并删除所有数据卷（⚠️ 数据丢失）
	docker compose down -v

# ──────────── Backend ────────────

install: ## 安装后端 Python 依赖（需要先 cd backend）
	cd backend && pip install -e ".[dev]"

backend: ## 启动后端开发服务器
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

backend-test: ## 运行后端测试
	cd backend && pytest -v

backend-lint: ## 后端代码检查
	cd backend && ruff check . && ruff format --check .

# ──────────── Frontend ────────────

frontend: ## 启动前端开发服务器
	cd frontend && npm run dev

frontend-install: ## 安装前端依赖
	cd frontend && npm install

frontend-build: ## 构建前端生产包
	cd frontend && npm run build

# ──────────── Quick Start ────────────

dev: infra ## 一键启动开发环境（基础设施 + 后端 + 前端）
	@echo "⏳ Waiting for infrastructure …"
	@sleep 5
	@echo "✅ Infrastructure ready. Start backend and frontend in separate terminals:"
	@echo "   make backend"
	@echo "   make frontend"
