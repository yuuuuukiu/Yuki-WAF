-- ============================================================
--  Yuki-WAF  — init_worker 阶段
--  Nginx 每个 worker 启动时执行一次
--  用途：初始化定时任务、预热共享字典等
-- ============================================================

local _M = {}

function _M.init()
    ngx.log(ngx.INFO, "[Yuki-WAF] worker init — pid: ", ngx.worker.pid())

    -- TODO: 后续在此处添加
    -- 1. 从 MySQL/Redis 拉取黑名单，写入 waf_blacklist 共享字典
    -- 2. 启动定时器，周期性刷新规则
    -- 3. 初始化 Kafka producer 连接池
end

_M.init()

return _M
