import { useState } from 'react';
import { login } from '../api/user';
import Form from '../components/Form';

export default function Login() {
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const response = await login(data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);

      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <Form onSubmit={onSubmit} error={error}/>
      <a href="/users/signup">Sign up</a>
    </div>
  )
}