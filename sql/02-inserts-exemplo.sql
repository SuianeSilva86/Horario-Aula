-- Professores
INSERT INTO professor (name) VALUES 
('Prof. Girafales'),
('Prof. Madruga'),
('Prof. Florinda');

-- Salas
INSERT INTO room (name) VALUES 
('Sala 101'),
('Sala 102');

-- Disciplinas
INSERT INTO subject (name, professor_id) VALUES
('Matemática', 1),
('História', 2),
('Português', 3);

-- Turmas
INSERT INTO class (subject_id) VALUES
(1),
(2),
(3);

-- Horários
INSERT INTO class_schedule (class_id, room_id, day_of_week, start_time, end_time) VALUES
(1, 1, 'Monday', '08:00', '10:00'),
(1, 1, 'Wednesday', '08:00', '10:00'),
(2, 2, 'Tuesday', '10:00', '12:00'),
(3, 1, 'Friday', '13:00', '15:00');
