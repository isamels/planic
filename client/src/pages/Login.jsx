import { useState } from 'react';
import { login } from '../api/users';
import Form from '../components/Form';
import { useAuth } from "../AuthProvider";

export default function Login() {
  const [input, setInput] = useState({ username: '', password: ''})
  const [error, setError] = useState('');
  const { setUser } = useAuth();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      try {
        const response = await login(input);
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        setUser(user);
  
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    } else {
      setError('Username and password are required');
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <Form route={"/login"} onChange={onChange} onSubmit={onSubmit} error={error}/>
      <a href="/signup">Sign up</a>
    </div>
  )
}