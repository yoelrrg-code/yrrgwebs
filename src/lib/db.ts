import mysql, { Pool } from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var __yrrgMysqlPool: Pool | undefined;
}

export function getMysqlConfig() {
  return {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "yrrgwebs",
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 5),
  };
}

export async function getMysqlPool(): Promise<Pool> {
  if (global.__yrrgMysqlPool) {
    return global.__yrrgMysqlPool;
  }

  const cfg = getMysqlConfig();

  // In local development only, ensure the target database exists
  if (process.env.NODE_ENV !== "production") {
    try {
      const bootstrapConn = await mysql.createConnection({
        host: cfg.host,
        port: cfg.port,
        user: cfg.user,
        password: cfg.password,
        connectTimeout: 2000,
      });
      await bootstrapConn.query(
        `CREATE DATABASE IF NOT EXISTS \`${cfg.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
      );
      await bootstrapConn.end();
    } catch {
      // If bootstrap fails, let pool creation or query caller handle fallback
    }
  }

  // Optimized connection pool for serverless & high-concurrency environments
  const pool = mysql.createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    waitForConnections: true,
    connectionLimit: cfg.connectionLimit,
    maxIdle: Math.min(2, cfg.connectionLimit),
    idleTimeout: 30000, // 30 seconds idle release
    queueLimit: 50, // Prevent unbounded memory queues under surge
    connectTimeout: 3000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });

  global.__yrrgMysqlPool = pool;
  return pool;
}
