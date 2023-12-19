import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import HomeUser from './components/HomeUser';
import TrainerImageGallery from './components/AvatarPick';
import PartnerPick from './components/PartnerPick';

function App() {
  return (
    <Router>
      <div>
        {/* Add Navigation here if needed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/trainer" element={<TrainerImageGallery />} />
          <Route path="/partner" element={<PartnerPick />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
