import { useState } from 'react';
import { signup } from '../api/user';
import Form from '../components/Form';
import { useAuth } from "../AuthProvider";

export default function Signup() {
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
        const response = await signup(input);
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
      <h1>Sign up</h1>
      <Form route={"/signup"} onChange={onChange} onSubmit={onSubmit} error={error}/>
      <a href="/login">Log in</a>
    </div>
  )
}