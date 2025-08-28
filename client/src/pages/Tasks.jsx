import { useState, useEffect } from 'react';
import { getTasks, createTask } from '../api/tasks';
import CreateTask from '../components/CreateTask';

export default function Tasks() {
  const [input, setInput] = useState({ title: '', minutes: 0})
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);

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
  }

  const onSubmit = async (e) => {
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
  }

  return (
    <div>
      <h1>Your tasks</h1>
      <CreateTask input={input} onChange={onChange} onSubmit={onSubmit} error={error}/>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}