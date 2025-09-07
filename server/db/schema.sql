CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  deadline DATE,
  minutes INTEGER NOT NULL CHECK (minutes > 0),
  priority SMALLINT DEFAULT 0 CHECK (priority BETWEEN 1 AND 5),
  difficulty SMALLINT DEFAULT 0 CHECK (difficulty BETWEEN 1 AND 5),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  position INTEGER
);

CREATE TABLE task_chunks (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  minutes INTEGER NOT NULL CHECK (minutes > 0),
  date DATE NOT NULL,
  locked BOOLEAN DEFAULT FALSE,
  excluded_dates JSONB,
  progress NUMERIC(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE availability_default (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  minutes INTEGER NOT NULL CHECK (minutes >= 0),
  PRIMARY KEY (user_id, day_of_week)
);

CREATE TABLE availability_custom (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  minutes INTEGER NOT NULL CHECK (minutes >= 0),
  PRIMARY KEY (user_id, date)
);