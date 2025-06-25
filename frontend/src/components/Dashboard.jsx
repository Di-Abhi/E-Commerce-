import React from 'react';
import axios from 'axios';

const Dashboard = ({ userDetails, onLogout }) => {
  if (!userDetails) return null;

  const firstLetter = userDetails.name?.charAt(0).toUpperCase() || '?';

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5001/auth/logout', {}, { withCredentials: true });
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffde7] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border-2 border-yellow-300">
        {/* Avatar and User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-400 text-white flex items-center justify-center text-2xl font-semibold shadow">
            {firstLetter}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{userDetails.name}</h2>
            <p className="text-sm text-gray-600">{userDetails.email}</p>
          </div>
        </div>

        {/* Role Section */}
        {userDetails.role && (
          <div className="mt-2">
            <h3 className="text-md font-semibold text-yellow-800">Role</h3>
            <p className="text-gray-700">{userDetails.role}</p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
