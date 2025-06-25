import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = ['About', 'Services', 'Contact'];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-500">Bazaaro</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 font-medium">
            <li>
              <Link to="/" className="text-gray-700 hover:text-yellow-500 transition">
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="text-gray-700 hover:text-yellow-500 transition"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-yellow-400 text-black px-4 py-1.5 rounded-md hover:bg-yellow-500 transition font-semibold"
          >
            Login
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="block text-gray-700 hover:text-yellow-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="block text-gray-700 hover:text-yellow-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar (Mobile) */}
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Login Button (Mobile) */}
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition font-semibold"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
