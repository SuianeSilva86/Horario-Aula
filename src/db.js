import dotenv from "dotenv";
import pg from "pg";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "user",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "horarios_aula",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
});

export default pool;
