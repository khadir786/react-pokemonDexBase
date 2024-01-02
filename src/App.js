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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  // potential changes were stashed but localStorage is stupid
  // on a refresh, isLoggedin is false

  // possible solution is more localStorage!!!!!!!!!!!!!!!!

  // store isLoggedIn flag in localStorage
  // initialise isLoggedIn state with whether or not isLoggedIn exists
  // (localStorage.getItem('isLoggedIn') === "true")
  // adjust login and logout accordingly
  // if user decides to change the flag manually, just log them out

  console.log(isLoggedIn);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <HomeUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainer"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <TrainerImageGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <PartnerPick />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
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
