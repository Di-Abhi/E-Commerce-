import { useState } from 'react';
import axios from 'axios';

const Login = ({updateUserDetails}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (formData.email.length === 0) {
      isValid = false;
      newError.email = 'Email is required';
    }

    if (formData.password.length === 0) {
      isValid = false;
      newError.password = 'Password is required';
    }
    setErrors(newError);
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {

      const body = {
        username: formData.email,
        password: formData.password
      }

      const config = {
        withCredentials: true,
      }

      try{

        const response = await axios.post('http://localhost:5001/auth/login',body,config);

        updateUserDetails(response.data.userDetails);

      }catch(error){
        setErrors({message: 'Something went wrong, please try again.'});
      }
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 overflow-hidden text-gray-800 antialiased">
      <div className="relative py-3 w-full max-w-sm mx-auto text-center">
        <span className="text-2xl font-light">Login to your account</span>
        {errors.message && (
          <div className="mt-4 text-red-500 text-sm">
            {errors.message}
          </div>
        )}
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md"></div>
          <form onSubmit={handleSubmit} className="px-8 py-6">
            <div>
              <input
                type="email"
                required
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                value={formData.email}
                name='email'
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                required
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                value={formData.password}
                name='password'
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className='flex justify-between items-baseline'>
              <button
                type="submit"
                className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              >
                Login
              </button>
              <a href="#" className="text-sm hover:underline">Forgot password?</a>
            </div>
          </form>
          {message && (
            <div className="px-8 pb-4 text-sm text-center text-red-600">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
