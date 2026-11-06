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
  };
}

export async function getMysqlPool(): Promise<Pool> {
  if (global.__yrrgMysqlPool) {
    return global.__yrrgMysqlPool;
  }

  const cfg = getMysqlConfig();

  // First ensure the target database exists if connecting to local MySQL
  try {
    const bootstrapConn = await mysql.createConnection({
      host: cfg.host,
      port: cfg.port,
      user: cfg.user,
      password: cfg.password,
      connectTimeout: 2500,
    });
    await bootstrapConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${cfg.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await bootstrapConn.end();
  } catch {
    // If bootstrap connection fails, let pool creation or query caller handle fallback
  }

  const pool = mysql.createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 2500,
  });

  global.__yrrgMysqlPool = pool;
  return pool;
}
