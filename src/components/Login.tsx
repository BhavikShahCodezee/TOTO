import React from 'react';
import { useForm } from '../hooks/useForm';
import { login } from '../services/auth';

const Login: React.FC = () => {
  const { form, handleChange } = useForm({ username: '', password: '' });

  const handleLogin = async () => {
    const user = await login(form.username, form.password);
    if (user) {
      alert('Login successful!');
      // handle login state (e.g., set user in context or state)
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
