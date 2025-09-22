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
