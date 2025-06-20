import React from 'react';
import axios from 'axios';

const Dashboard = ({ userDetails, onLogout }) => {
  if (!userDetails) return null;

  const firstLetter = userDetails.name?.charAt(0).toUpperCase() || '?';

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/auth/logout', {}, { withCredentials: true });
      onLogout(); // Clear userDetails from App
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Avatar and User Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold">
            {firstLetter}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{userDetails.name}</h2>
            <p className="text-sm text-gray-600">{userDetails.email}</p>
          </div>
        </div>

        {userDetails.role && (
          <div className="mt-4">
            <h3 className="text-md font-semibold text-gray-700">Role</h3>
            <p className="text-gray-600">{userDetails.role}</p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
