-- ============================================================
--  Yuki-WAF  — Kafka Producer 封装
--  依赖 lua-resty-kafka
--  TODO: 安装 lua-resty-kafka 后实现
-- ============================================================

local _M = {}

-- 发送消息到 Kafka
-- @param topic  string  Kafka topic 名称
-- @param key    string  消息 key（通常用 IP）
-- @param value  string  JSON 消息体
-- @return ok, err
function _M.send(topic, key, value)
    -- TODO: 实现 Kafka 生产者
    -- local producer = require("resty.kafka.producer")
    -- local broker_list = { { host = "kafka", port = 9092 } }
    -- local p = producer:new(broker_list)
    -- return p:send(topic, key, value)
    ngx.log(ngx.INFO, "[KafkaProducer] stub send to=", topic, " key=", key)
    return true, nil
end

return _M
