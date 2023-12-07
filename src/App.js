import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/rl-transitions.css';

function App() {
  const [showRegister, setShowRegister] = useState(true);

  function toggleRegister() {
    setShowRegister(!showRegister);
  }

  return (
    <div className="Landing">
      <Header />

      <CSSTransition
        in={!showRegister}
        timeout={0}
        classNames="fade"
        unmountOnExit
      >
        <Login toggleRegister={toggleRegister} />
      </CSSTransition>

      <CSSTransition
        in={showRegister}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Register toggleRegister={toggleRegister} />
      </CSSTransition>
    </div>
  );
}

export default App;
