import 'dotenv/config';
import * as db from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function signupPost(req, res) {
  const { username, password } = req.body;
  try {
    const user = await db.createUser({ username, password });

    const data = {
      id: user.id,
      username: user.username
    }
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(201).json({ token, user: data });
  } catch (err) {
    if (err.code === '23505') {
      const error = new Error('Duplicate username');
      error.status = 400;
      error.publicMessage = 'Username already exists';
      throw error;
    }
    throw err;
  }

}

async function loginPost(req, res) {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);

  if (!user) {
    const err = new Error('User not found');
    err.status = 400;
    err.publicMessage = 'User does not exist';
    throw err;
  }
  
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error('Password did not match');
    err.status = 400;
    err.publicMessage = 'Incorrect password';
    throw err;
  }

  const data = {
    id: user.id,
    username: user.username
  }
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({ token, user: data });
}

async function accountGet(req, res) {
  const user = await db.getUserById(req.user.id);

  if (!user) {
    const err = new Error('User not found');
    err.status = 400;
    err.publicMessage = 'User does not exist';
    throw err;
  }

  res.json({ id: user.id, username: user.username });
}

async function accountDelete(req, res) {
  const { id } = req.user;
  const user = await db.getUserById(id);

  if (!user) {
    const err = new Error('User not found');
    err.status = 400;
    err.publicMessage = 'User does not exist';
    throw err;
  }

  await db.removeUser(id);
  
  res.status(204).send();
}

export {
  signupPost,
  loginPost,
  accountGet,
  accountDelete
}