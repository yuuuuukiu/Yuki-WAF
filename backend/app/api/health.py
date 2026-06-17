"""健康检查 & 基础状态接口。"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "yuki-waf-backend"}
