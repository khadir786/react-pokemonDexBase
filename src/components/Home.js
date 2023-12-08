import React, { useState, useEffect } from 'react';
import Header from './Header';
import { CSSTransition } from 'react-transition-group';
import '../css/home.css';
import '../css/rl-transitions.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);

  useEffect(() => {
    // Delay the animation by a short period (e.g., 100 milliseconds)
    const delay = setTimeout(() => {
      setIsWelcomeVisible(true);
    }, 100);

    return () => clearTimeout(delay); // Clear the timeout on unmount
  }, []);

  return (
    <div className="Landing">
      <Header />
      <CSSTransition
        in={isWelcomeVisible}
        timeout={500} // Set the timeout to control the animation duration
        classNames="welcome-fade"
        unmountOnExit
      >
        <div className='welcome'>
          <h1>Welcome to the PokemonDexBase website!!!</h1>
        </div>
      </CSSTransition>
      <CSSTransition
        in={isWelcomeVisible}
        timeout={500} // Set the timeout to control the animation duration
        classNames="welcome2-fade"
        unmountOnExit
      >
        <div className='welcome'>
          <h1><span><Link to="/login">Login</Link></span> - <span><Link to="/register">Register</Link></span> 
          </h1>
        </div>
      </CSSTransition>
    </div>
  );
}
