"""Yuki-WAF 后端配置 — 基于 pydantic-settings，从 .env 自动加载。"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # ---------- App ----------
    app_name: str = "Yuki-WAF"
    debug: bool = False
    secret_key: str = "change-me"

    # ---------- MySQL ----------
    mysql_host: str = "127.0.0.1"
    mysql_port: int = 3306
    mysql_user: str = "yuki"
    mysql_password: str = "yuki_pass_2024"
    mysql_database: str = "yuki_waf"

    @property
    def database_url(self) -> str:
        return (
            f"mysql+aiomysql://{self.mysql_user}:{self.mysql_password}"
            f"@{self.mysql_host}:{self.mysql_port}/{self.mysql_database}"
            "?charset=utf8mb4"
        )

    @property
    def database_url_sync(self) -> str:
        """同步 URL，用于 Alembic 迁移等场景。"""
        return (
            f"mysql+pymysql://{self.mysql_user}:{self.mysql_password}"
            f"@{self.mysql_host}:{self.mysql_port}/{self.mysql_database}"
            "?charset=utf8mb4"
        )

    # ---------- Redis ----------
    redis_host: str = "127.0.0.1"
    redis_port: int = 6379
    redis_db: int = 0

    @property
    def redis_url(self) -> str:
        return f"redis://{self.redis_host}:{self.redis_port}/{self.redis_db}"

    # ---------- Kafka ----------
    kafka_bootstrap_servers: str = "127.0.0.1:9092"
    kafka_topic_raw_requests: str = "waf.raw_requests"
    kafka_consumer_group: str = "yuki-waf-audit"

    # ---------- AI Provider (默认 / 管理员级别) ----------
    ai_base_url: str = "https://api.openai.com/v1"
    ai_api_key: str = ""
    ai_model: str = "gpt-4o-mini"


@lru_cache
def get_settings() -> Settings:
    return Settings()
