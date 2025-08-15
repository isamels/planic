import * as db from '../models/tasksModel.js';

async function tasksGet(req, res) {
  const tasks = await db.getAllTasks(req.user.id);
  res.json({ tasks });
}

async function tasksPost(req, res) {
  const { title, description, deadline, minutes, priority, difficulty } = req.body;

  if (!title || !minutes) {
    const err = new Error('Missing required properties');
    err.status = 400;
    err.publicMessage = 'Missing title and/or estimated minutes';
    throw err;
  }

  const addedTask = await db.addTask(req.user.id, {
    title,
    description,
    deadline,
    minutes,
    priority,
    difficulty
  });
  res.status(201).json({ task: addedTask });
}

async function taskGet(req, res) {
  const task = await db.getTask(req.params.id);

  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    err.publicMessage = 'Task does not exist';
    throw err;
  }
  if (task.user_id !== req.user.id) {
    const err = new Error('Forbidden: You do not have permission to access this task');
    err.status = 403;
    err.publicMessage = 'You cannot view or modify this task';
    throw err;
  }

  res.json({ task });
}

async function taskPut(req, res) {
  const { id } = req.params;
  
  const task = await db.getTask(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    err.publicMessage = 'Task does not exist';
    throw err;
  }
  if (task.user_id !== req.user.id) {
    const err = new Error('Forbidden: You do not have permission to access this task');
    err.status = 403;
    err.publicMessage = 'You cannot view or modify this task';
    throw err;
  }

  const { title, description, deadline, minutes, priority, difficulty } = req.body;
  const updatedTask = await db.editTask(id, {
    title,
    description,
    deadline,
    minutes,
    priority,
    difficulty
  });

  res.json({ task: updatedTask });
}

async function taskDelete(req, res) {
  const { id } = req.params;

  const task = await db.getTask(id);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    err.publicMessage = 'Task does not exist';
    throw err;
  }                
  if (task.user_id !== req.user.id) {
    const err = new Error('Forbidden: You do not have permission to access this task');
    err.status = 403;
    err.publicMessage = 'You cannot view or modify this task';
    throw err;
  }

  await db.removeTask(id);

  res.status(204).send();
}

export {
  tasksGet,
  tasksPost,
  taskGet,
  taskPut,
  taskDelete
};