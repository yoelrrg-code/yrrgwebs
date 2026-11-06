-- YRRG.ai Helpdesk, Multi-Project & Ticket Portal Schema (MySQL UTF8MB4)
CREATE DATABASE IF NOT EXISTS `yrrgwebs`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `yrrgwebs`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NULL,
  `auth_provider` ENUM('credentials', 'google', 'github', 'magic_link') NOT NULL DEFAULT 'credentials',
  `role` ENUM('client', 'approver', 'admin') NOT NULL DEFAULT 'client',
  `company` VARCHAR(191) NOT NULL,
  `phone_whatsapp` VARCHAR(64) NOT NULL,
  `country` VARCHAR(100) NOT NULL DEFAULT 'Argentina',
  `tax_id` VARCHAR(64) NULL,
  `avatar_url` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `code` VARCHAR(32) NOT NULL UNIQUE,
  `user_id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `service_type` ENUM('smart-website', 'migracion', 'optimizacion', 'ai-seo', 'mantenimiento') NOT NULL DEFAULT 'smart-website',
  `status` ENUM('onboarding', 'development', 'preview_ready', 'production') NOT NULL DEFAULT 'onboarding',
  `current_domain` VARCHAR(255) NULL,
  `preview_url` VARCHAR(500) NULL,
  `production_url` VARCHAR(500) NULL,
  `kickoff_date` VARCHAR(100) NULL,
  `kickoff_notes` TEXT NULL,
  `brand_vault_notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_projects_user_id` (`user_id`),
  CONSTRAINT `fk_projects_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `ticket_number` VARCHAR(32) NOT NULL UNIQUE,
  `user_id` VARCHAR(64) NOT NULL,
  `project_id` VARCHAR(64) NOT NULL,
  `type` ENUM('initial_build', 'content_update', 'new_feature', 'optimization_seo', 'support') NOT NULL DEFAULT 'content_update',
  `priority` ENUM('normal', 'high', 'urgent') NOT NULL DEFAULT 'normal',
  `status` ENUM('received', 'in_progress', 'preview_ready', 'approved_live', 'closed') NOT NULL DEFAULT 'received',
  `channel` ENUM('web_helpdesk', 'whatsapp_sync', 'email') NOT NULL DEFAULT 'web_helpdesk',
  `subject` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `preview_url` VARCHAR(500) NULL,
  `approved_by` VARCHAR(191) NULL,
  `approved_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_tickets_user_id` (`user_id`),
  INDEX `idx_tickets_project_id` (`project_id`),
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_tickets_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ticket_messages` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `ticket_id` VARCHAR(64) NOT NULL,
  `sender_user_id` VARCHAR(64) NULL,
  `sender_name` VARCHAR(191) NOT NULL,
  `sender_role` ENUM('client', 'admin', 'ai_agent') NOT NULL DEFAULT 'client',
  `message` TEXT NOT NULL,
  `attachment_url` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_messages_ticket_id` (`ticket_id`),
  CONSTRAINT `fk_messages_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `email_notifications_log` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `recipient_email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `event_type` VARCHAR(64) NOT NULL,
  `related_ticket_number` VARCHAR(32) NULL,
  `related_project_code` VARCHAR(32) NULL,
  `client_name` VARCHAR(191) NOT NULL,
  `body_preview` TEXT NOT NULL,
  `delivery_status` ENUM('sent_resend', 'logged_local_outbox') NOT NULL DEFAULT 'logged_local_outbox',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
