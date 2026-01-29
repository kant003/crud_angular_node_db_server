import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Pool } from 'pg';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const isProduction = process.env.NODE_ENV === 'production';

let db;

if (isProduction) {
  // PostgreSQL (Neon)
  const { Pool } = await import('pg');
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  // MariaDB (local)
  const mysql = await import('mysql2/promise');
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export { db };