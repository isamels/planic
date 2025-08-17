import pool from './pool.js';
import bcrypt from 'bcryptjs';

async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0];
}

async function createUser({ username, password }) {
  const query = `
    INSERT INTO users (username, password_hash)
    VALUES ($1, $2)
    RETURNING *
  `;

  const password_hash = await bcrypt.hash(password, 10);
  const values = [username, password_hash];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function removeUser(id) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}

export {
  getUserById,
  getUserByUsername,
  createUser,
  removeUser
}