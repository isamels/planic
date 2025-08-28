import { useState, useEffect } from 'react';
import { getTasks, createTask, editTask, deleteTask } from '../api/tasks';
import TaskEditor from '../components/TaskEditor';

export default function Tasks() {
  const [input, setInput] = useState({ title: '', minutes: 0})
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      const { tasks } = response.data;
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onCreateTask = async (e) => {
    e.preventDefault();
    if (input.title !== '' && input.minutes > 0) {
      try {
        const response = await createTask(input);
        const { task } = response.data;
  
        setTasks((prevTasks) => [...prevTasks, task]);
        setInput({ title: '', minutes: 0 });
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    } else {
      setError('Title and minutes are required');
    }
  };

  const onUpdateTask = async (e) => {
    e.preventDefault();
    if (input.title !== '' && input.minutes > 0) {
      try {
        const response = await editTask(currentTask.id, input);
        const { task } = response.data;
  
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)));
        setInput({ title: '', minutes: 0 });
        setError('');
        setCurrentTask(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    } else {
      setError('Title and minutes are required');
    }
  };

  const onTaskClick = (task) => {
    setCurrentTask(task);
    setInput(task);
  };

  const onTaskDelete = async (e) => {
    try {
      const response = await deleteTask(currentTask.id);

      setTasks((prevTasks) => prevTasks.filter((task) => (task.id !== currentTask.id)));
      setInput({ title: '', minutes: 0 });
      setError('');
      setCurrentTask(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div>
      <h1>Your tasks</h1>
      <TaskEditor
        input={input}
        onChange={onChange}
        onSubmit={currentTask ? onUpdateTask : onCreateTask}
        onDelete={onTaskDelete}
        currentTask={currentTask}
        error={error}
      />
      <ul>
        {tasks.map(task => (
          <li key={task.id} onClick={() => onTaskClick(task)} style={{ cursor: "pointer" }}>{task.title}</li>
        ))}
      </ul>
      <a href="/">Back to dashboard</a>
    </div>
  );
}