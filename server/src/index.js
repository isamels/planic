import express from 'express';
import tasksRouter from './routes/tasksRouter.js';

const app = express();

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});