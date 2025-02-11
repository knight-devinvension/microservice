import React from 'react';
import NavBar from './components/NavBar';
import { AppRouter } from './router';
import './App.css';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <AppRouter />
      <ToastContainer />
    </div>
  );
};

export default App;
