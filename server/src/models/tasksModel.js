import pool from './pool.js';

async function getAllTasks(user_id) {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
  return rows;
}

async function getTask(id) {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return rows[0];
}

async function addTask(user_id, { title, description, deadline, minutes, priority, difficulty }) {
  const query = `
    INSERT INTO tasks (user_id, title, description, deadline, minutes, priority, difficulty)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

  const values = [ user_id, title, description, deadline, minutes, priority, difficulty ];
  const definedValues = values.map((value) => value === undefined ? null : value);

  const { rows } = await pool.query(query, definedValues);
  return rows[0];
}

async function editTask(id, task) {
  const fields = Object.entries(task).filter(([_, value]) => value !== undefined);
  const setValues = fields.map(([key], index) => `${key} = $${index + 1}`);
  const values = fields.map(([_, value]) => value);
  values.push(id);

  const query = `
    UPDATE tasks
    SET ${setValues.join(', ')}
    WHERE id = $${values.length}
    RETURNING *
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function removeTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

export {
  getAllTasks,
  getTask,
  addTask,
  editTask,
  removeTask
};