-- ============================================================
--  Yuki-WAF  — access 阶段（请求进入时执行）
--  职责：IP 黑名单检查、基础限流、初步规则匹配
-- ============================================================

local _M = {}

function _M.run()
    local client_ip = ngx.var.remote_addr
    local blacklist = ngx.shared.waf_blacklist

    -- 1. 黑名单检查
    if blacklist:get(client_ip) then
        ngx.log(ngx.WARN, "[Yuki-WAF] blocked IP: ", client_ip)
        ngx.status = 403
        ngx.header["Content-Type"] = "application/json"
        ngx.say('{"error":"forbidden","message":"IP blocked by WAF"}')
        return ngx.exit(403)
    end

    -- TODO: 后续在此处添加
    -- 2. 滑动窗口限流（基于 Redis）
    -- 3. User-Agent / Header 异常检测
    -- 4. 请求体大小限制
end

_M.run()

return _M
