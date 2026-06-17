-- ============================================================
--  Yuki-WAF  — log 阶段（请求完成后执行）
--  职责：采集请求元数据，异步投递到 Kafka
-- ============================================================

local _M = {}

function _M.run()
    -- 采集请求上下文
    local entry = {
        timestamp    = ngx.now(),
        client_ip    = ngx.var.remote_addr,
        method       = ngx.var.request_method,
        uri          = ngx.var.request_uri,
        status       = ngx.status,
        body_bytes   = ngx.var.body_bytes_sent,
        user_agent   = ngx.var.http_user_agent or "",
        referer      = ngx.var.http_referer or "",
        request_time = ngx.var.request_time,
    }

    -- 序列化为 JSON
    local cjson = require("cjson")
    local json_str = cjson.encode(entry)

    -- TODO: 后续替换为真正的 Kafka 投递
    -- 方案 A: 使用 lua-resty-kafka 异步生产者
    -- 方案 B: 先写入 shared dict，由定时器批量刷出
    ngx.log(ngx.INFO, "[Yuki-WAF] request log: ", json_str)
end

_M.run()

return _M
