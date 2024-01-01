import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/sub_components/ProtectedRoute'
import Register from './components/Register';
import HomeUser from './components/HomeUser';
import TrainerImageGallery from './components/AvatarPick';
import PartnerPick from './components/PartnerPick';
import CreateProfile from './components/CreateProfile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />

          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomeUser />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trainer" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TrainerImageGallery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/partner" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PartnerPick />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-profile" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CreateProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
