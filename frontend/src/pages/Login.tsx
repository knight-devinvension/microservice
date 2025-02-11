import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  
import api from '../api/axiosConfig';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      toast.success('Login successful!');
      
      navigate('/dashboard');
    } catch (err: any) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container container">
      <form onSubmit={handleLogin} className="login-form material-card">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="material-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="material-input"
          />
        </div>

        <button type="submit" className="btn primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
