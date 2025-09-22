import pool from "./db.js";

async function horariosLivresPorSala(roomId, inicioDia = "08:00", fimDia = "18:00") {
  const res = await pool.query(
    `SELECT start_time, end_time
     FROM class_schedule
     WHERE room_id = $1
     ORDER BY start_time`, 
    [roomId]
  );

  const ocupados = res.rows;
  let livres = [];
  let atual = inicioDia;

  for (let aula of ocupados) {
    if (atual < aula.start_time) {
      livres.push({ inicio: atual, fim: aula.start_time });
    }
    atual = aula.end_time;
  }

  if (atual < fimDia) {
    livres.push({ inicio: atual, fim: fimDia });
  }

  return { ocupados, livres };
}

async function main() {
  try {
    const salas = await pool.query("SELECT id, name FROM room");

    for (let sala of salas.rows) {
      const { ocupados, livres } = await horariosLivresPorSala(sala.id);
      console.log(`\nSala: ${sala.name}`);
      console.log("Ocupados:", ocupados);
      console.log("Livres:", livres);
    }
  } catch (err) {
    console.error("Erro:", err);
  } finally {
    await pool.end();
  }
}

main();
