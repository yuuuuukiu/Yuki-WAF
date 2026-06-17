-- ============================================================
--  Yuki-WAF  — 数据库初始化脚本
--  MySQL 容器首次启动时自动执行（/docker-entrypoint-initdb.d）
-- ============================================================

USE yuki_waf;

-- ---------- 用户表 ----------
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(64)  NOT NULL UNIQUE,
    email       VARCHAR(128) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,  -- bcrypt hash
    role        ENUM('admin', 'operator', 'viewer') NOT NULL DEFAULT 'viewer',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- AI 配置表（用户自定义 API 接入） ----------
CREATE TABLE IF NOT EXISTS ai_configs (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    name        VARCHAR(64)  NOT NULL COMMENT '配置名称，如 "GPT-4o"',
    base_url    VARCHAR(255) NOT NULL COMMENT 'AI API Base URL',
    api_key     VARCHAR(512) NOT NULL COMMENT '加密存储的 API Key',
    model       VARCHAR(64)  NOT NULL DEFAULT 'gpt-4o-mini',
    is_default  TINYINT(1) NOT NULL DEFAULT 0,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- 审计日志表 ----------
CREATE TABLE IF NOT EXISTS audit_logs (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_ip    VARCHAR(45)  NOT NULL,
    request_uri  VARCHAR(512) NOT NULL,
    method       VARCHAR(10)  NOT NULL,
    status_code  SMALLINT UNSIGNED,
    user_agent   VARCHAR(512),
    risk_level   ENUM('safe', 'low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'safe',
    ai_verdict   TEXT         COMMENT 'AI 返回的审计结论 JSON',
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ip (client_ip),
    INDEX idx_time (created_at),
    INDEX idx_risk (risk_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- WAF 规则表 ----------
CREATE TABLE IF NOT EXISTS waf_rules (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(128) NOT NULL,
    description TEXT,
    rule_type   ENUM('ip_blacklist', 'ip_whitelist', 'rate_limit', 'header_check', 'custom') NOT NULL,
    pattern     TEXT         NOT NULL COMMENT '规则内容（JSON 或正则）',
    enabled     TINYINT(1) NOT NULL DEFAULT 1,
    priority    INT NOT NULL DEFAULT 100 COMMENT '越小越优先',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_enabled (enabled, priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------- 告警记录表 ----------
CREATE TABLE IF NOT EXISTS alerts (
    id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    audit_log_id BIGINT UNSIGNED,
    alert_type   VARCHAR(64)  NOT NULL,
    message      TEXT         NOT NULL,
    resolved     TINYINT(1) NOT NULL DEFAULT 0,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_at  DATETIME,
    INDEX idx_unresolved (resolved, created_at),
    FOREIGN KEY (audit_log_id) REFERENCES audit_logs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
