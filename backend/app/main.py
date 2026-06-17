"""Yuki-WAF 后端入口 — FastAPI 应用。"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.core.config import get_settings

settings = get_settings()

logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期：启动/关闭时执行。"""
    logging.info("🚀 Yuki-WAF backend starting …")
    # TODO: 在此处启动 Kafka consumer 后台任务
    yield
    logging.info("🛑 Yuki-WAF backend shutting down …")
    # TODO: 清理连接池


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    lifespan=lifespan,
)

# ---------- CORS（前端 dev server 跨域） ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 路由注册 ----------
app.include_router(health_router, prefix="/api", tags=["health"])

# TODO: 后续添加
# app.include_router(audit_router,    prefix="/api/audit",    tags=["audit"])
# app.include_router(rules_router,    prefix="/api/rules",    tags=["rules"])
# app.include_router(ai_router,       prefix="/api/ai",       tags=["ai"])
# app.include_router(auth_router,     prefix="/api/auth",     tags=["auth"])
