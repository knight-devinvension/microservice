import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  
import api from '../api/axiosConfig';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/register', { name, email, password });
      toast.success('User registered successfully!');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message;
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="register-container container">
      <form onSubmit={handleRegister} className="register-form material-card">
        <h2>Register</h2>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="material-input"
          />
        </div>
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

        <button type="submit" className="btn primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
