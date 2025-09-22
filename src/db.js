import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "horarios_aula",
  password: "password",
  port: 5432,
});

export default pool;
