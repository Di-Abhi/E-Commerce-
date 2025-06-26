import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER } from '../../redux/user/actions'; // adjust the path as needed
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let isValid = true;
    const newError = {};

    if (!formData.name.trim()) {
      isValid = false;
      newError.name = 'Name is required';
    }

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        'http://localhost:5001/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      dispatch({ type: SET_USER, payload: response.data.userDetails });
      setMessage('Registration successful!');
      setErrors({});
      navigate('/'); // Redirect to home after registration
    } catch (error) {
      setMessage('');
      if (error.response?.data?.message) {
        setErrors({ message: error.response.data.message });
      } else {
        setErrors({ message: 'Something went wrong, please try again.' });
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

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

        <button type="submit">Register</button>

        {errors.message && <p className="error">{errors.message}</p>}
        {message && <p className="success">{message}</p>}

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
