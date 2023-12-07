import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [showRegister, setShowRegister] = useState(false) 

  function toggleRegister() {
    setShowRegister(!showRegister);
  }

  return (
    <div className="Landing">
      <Header />
      {showRegister ? <Login toggleRegister = {toggleRegister}/> : 
      <Register toggleRegister={toggleRegister}/>}

    </div>
  );
}

export default App;
