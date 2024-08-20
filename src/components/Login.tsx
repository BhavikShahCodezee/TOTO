import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/auth';

const Login: React.FC = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await login(username, password);
    if (user) {
      loginUser(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className='login_main'>
      <div className='login_wrapper'>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <p>
        Don't have an account?
        <a href="/signup" className="signup-link">Sign Up</a>
      </p>
      </div>
      
    </div>
  );
};

export default Login;
