import pool from './pool.js';

async function getDefaultHours(user_id, day) {
  const { rows } = await pool.query('SELECT * FROM availability_default WHERE user_id = $1 AND day_of_week = $2', [user_id, day]);
  if (rows.length === 0) {
    return { user_id, day_of_week: day, hours: 0 };
  }
  return rows[0];
}

async function setDefaultHours(user_id, day, hours) {
  const query = `
    INSERT INTO availability_default (user_id, day_of_week, hours)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, day_of_week)
    DO UPDATE SET hours = EXCLUDED.hours
    RETURNING *
  `;

  const values = [ user_id, day, hours ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getDateHours(user_id, dateString) {
  const date = new Date(dateString);
  const { rows } = await pool.query('SELECT * FROM availability_custom WHERE user_id = $1 AND date = $2', [user_id, date]);
  if (rows.length === 0) {
    return getDefaultHours(user_id, date.getDay());
  }
  return rows[0];
}

async function setDateHours(user_id, date, hours) {
  const query = `
    INSERT INTO availability_custom (user_id, date, hours)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, date)
    DO UPDATE SET hours = EXCLUDED.hours
    RETURNING *
  `;

  const values = [ user_id, date, hours ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export { getDefaultHours, setDefaultHours, getDateHours, setDateHours };