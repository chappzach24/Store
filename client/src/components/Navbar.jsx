import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User data:', user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const AuthButton = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-3">
          <span className="text-white">Welcome, {user.username}</span>
          {/* Check if user exists AND has isAdmin property */}
          {user && user.isAdmin && (
            <Link 
              to="/admin/products" 
              className="text-white hover:text-gray-300"
            >
              Admin Dashboard
            </Link>
          )}
          <button 
            onClick={handleLogout}
            className="text-white hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <Link to="/auth" className="text-white hover:text-gray-300">
        Login | Signup
      </Link>
    );
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl">LOGO</Link>
          
          {/* Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-gray-300">
              Products
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
            <AuthButton />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              {user && user.isAdmin && (
                <Link 
                  to="/admin/products" 
                  className="text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <div onClick={() => setIsOpen(false)}>
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;