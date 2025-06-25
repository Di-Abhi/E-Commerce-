import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import AppLayout from './layout/AppLayout';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import {SET_USER} from './redux/user/actions';

const App = () => {
  // const [userDetails, setUserDetails] = useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setUserDetails(null);
  };

  const isUserLoggedIn = async () => {
    try {
      const res = await axios.post('http://localhost:5001/auth/isUserLoggedIn', {}, {
        withCredentials: true
      });
      dispatch({
        type: SET_USER,
        payload: res.data.userDetails
      });
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
              <Login/>
            )
          }
        />
        <Route
          path="/register"
          element={
            userDetails ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register />
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
