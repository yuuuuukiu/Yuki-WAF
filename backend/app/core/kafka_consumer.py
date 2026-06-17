"""Kafka 消费者 — 从 waf.raw_requests Topic 消费流量日志。"""

import asyncio
import json
import logging

from aiokafka import AIOKafkaConsumer

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


async def consume_raw_requests(handler) -> None:
    """
    持续消费 Kafka 消息，每条交给 handler(dict) 处理。

    handler 签名:  async def handler(message: dict) -> None
    """
    consumer = AIOKafkaConsumer(
        settings.kafka_topic_raw_requests,
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id=settings.kafka_consumer_group,
        auto_offset_reset="latest",
        enable_auto_commit=True,
    )
    await consumer.start()
    logger.info("Kafka consumer started — topic=%s", settings.kafka_topic_raw_requests)

    try:
        async for msg in consumer:
            try:
                data = json.loads(msg.value)
                await handler(data)
            except Exception:
                logger.exception("Error processing Kafka message")
    finally:
        await consumer.stop()


def run_consumer_loop(handler) -> None:
    """同步入口：启动 asyncio 事件循环并消费。"""
    asyncio.run(consume_raw_requests(handler))
