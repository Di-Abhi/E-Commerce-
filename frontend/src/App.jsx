import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Dashboard from './components/Dashboard'
import axios from 'axios'

const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (updateData) => {
    setUserDetails(updateData);
  };

  const handleLogout = () => {
    setUserDetails(null); 
  };

  const isUserLoggedIn = async () => {
    try {
      const res = await axios.post('http://localhost:5001/auth/isUserLoggedIn', {}, {
        withCredentials: true
      });
      updateUserDetails(res.data.userDetails);
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div className="container text-center mx-auto mt-10">
      <Routes>
        <Route
          path="/"
          element={
            userDetails ? (
              <Navigate to="/dashboard" />
            ) : (
              <AppLayout>
                <Home />
              </AppLayout>
            )
          }
        />
        <Route
          path="/login"
          element={
            userDetails ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login updateUserDetails={updateUserDetails} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            userDetails ? (
              <Dashboard userDetails={userDetails} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
