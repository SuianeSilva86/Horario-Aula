-- Professores
CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Salas
CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Disciplinas
CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    professor_id INT REFERENCES professor(id)
);

-- Turmas
CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subject(id)
);

-- Horários das aulas
CREATE TABLE class_schedule (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES class(id),
    room_id INT REFERENCES room(id),
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);
