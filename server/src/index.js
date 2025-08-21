import express from 'express';
import cors from 'cors';
import usersRouter from './routes/usersRouter.js';
import tasksRouter from './routes/tasksRouter.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send("Welcome to Planic!");
});

app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status || 500).json({
    message: err.publicMessage || 'Internal server error',
    code: err.code || 'INTERNAL_ERROR'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});