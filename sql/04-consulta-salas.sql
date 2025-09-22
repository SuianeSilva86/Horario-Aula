SELECT 
    r.id AS room_id,
    r.name AS sala,
    cs.day_of_week,
    cs.start_time,
    cs.end_time
FROM room r
LEFT JOIN class_schedule cs ON cs.room_id = r.id
ORDER BY r.id, cs.day_of_week, cs.start_time;
