import pool from "./db.js";

async function main() {
    try {
        const res1 = await pool.query(`
      SELECT 
          pr.id AS professor_id,
          pr.name AS professor,
          SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600) AS total_horas
      FROM professor pr
      JOIN subject s ON s.professor_id = pr.id
      JOIN class c ON c.subject_id = s.id
      JOIN class_schedule cs ON cs.class_id = c.id
      GROUP BY pr.id, pr.name
      ORDER BY total_horas DESC;
    `);
        console.log("Horas por professor:");
        const professores = res1.rows.map(row => ({
            professor_id: row.professor_id,
            professor: row.professor,
            total_horas: Number(row.total_horas).toFixed(2) // arredonda para 2 casas
        }));
        console.table(professores);
        const res2 = await pool.query(`
      SELECT 
          r.id AS room_id,
          r.name AS sala,
          cs.day_of_week,
          cs.start_time,
          cs.end_time
      FROM room r
      LEFT JOIN class_schedule cs ON cs.room_id = r.id
      ORDER BY r.id, cs.day_of_week, cs.start_time;
    `);
        console.log("\nSalas ocupadas:");
        const salas = res2.rows.map(row => ({
            Sala: row.sala,
            Dia: row.day_of_week,
            Inicio: row.start_time,
            Fim: row.end_time
        }));
        console.table(salas);

    } catch (err) {
        console.error("Erro ao executar queries:", err);
    } finally {
        await pool.end();
    }
}

main();
