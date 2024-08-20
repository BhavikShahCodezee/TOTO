import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';
import { AuthContext } from '../context/AuthContext';

const Signup: React.FC = () => {
  const { login: loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const user = await signup(username, password);
    if (user) {
      loginUser(user);
      navigate('/');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <div className='login_wrapper'>
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Signup</button>
      <p>
        Login 
        <a href="/login" className="signup-link">Login</a>
      </p>
      </div>
      
    </div>
  );
};

export default Signup;
