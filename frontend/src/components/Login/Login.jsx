import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import{ GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google' 

const Login = ({ updateUserDetails }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!formData.email.trim()) {
      isValid = false;
      newError.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      isValid = false;
      newError.password = 'Password is required';
    }

    setErrors(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        email: formData.email,
        password: formData.password
      };

      const config = {
        withCredentials: true
      };

      try {
        const response = await axios.post('http://localhost:5001/auth/login', body, config);
        updateUserDetails(response.data.userDetails);
        setMessage('Login successful!');
        setErrors({});
      } catch (error) {
        setMessage('');
        setErrors({ message: 'Something went wrong, please try again.' });
      }
    }
  };
  const handleGoogleSignin = async (authResponse)=>{
    try{
      const response = await axios.post('http://localhost:5001/auth/google-auth',{
        idToken: authResponse.credential
      },{
        withCredentials:true
      });
      updateUserDetails(response.data.userDetails);
    }catch(error){
      setErrors({message: 'Something went wrong while google signin'});
    }
  };

  const handleGoogleSigninFailure = async  (error)=>{
    setErrors({message: 'Something went wrong while google signin'});
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Login</button>

        {errors.message && <p className="error">{errors.message}</p>}
        {message && <p className="success">{message}</p>}

        <h2>OR</h2>
      <GoogleOAuthProvider clientId = {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin onSuccess = {handleGoogleSignin} onError={handleGoogleSigninFailure}/>
      </GoogleOAuthProvider>

        <p>Don’t have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
