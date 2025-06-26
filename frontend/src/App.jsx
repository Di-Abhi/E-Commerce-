import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import AppLayout from './layout/AppLayout';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER, CLEAR_USER } from './redux/user/actions';

const App = () => {
  const userDetails = useSelector(state => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUserLoggedIn = async () => {
    try {
      const res = await axios.post('http://localhost:5001/auth/isUserLoggedIn', {}, { withCredentials: true });
      if (res.data.userDetails) {
        dispatch({ type: SET_USER, payload: res.data.userDetails });
      }
    } catch (error) {
      dispatch({ type: SET_USER, payload: null });
      console.error('Error checking login:', error);
    }
  };
  const handleLogout = () => {
  dispatch({ type: CLEAR_USER });
};

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <div className="container mx-auto mt-10 text-center">
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/login"
          element={userDetails ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={userDetails ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={userDetails ? <Dashboard userDetails={userDetails} onLogout={() => dispatch({ type: SET_USER, payload: null })} /> : <Navigate to="/login" />}
        />
        {/* Add other routes like About, Services, Contact if needed */}
      </Routes>
    </div>
  );
};

export default App;
