"""Redis 客户端单例。"""

import redis.asyncio as aioredis

from app.core.config import get_settings

settings = get_settings()

redis_client = aioredis.from_url(
    settings.redis_url,
    decode_responses=True,
)


async def get_redis() -> aioredis.Redis:  # type: ignore[type-arg]
    """FastAPI 依赖注入。"""
    return redis_client
