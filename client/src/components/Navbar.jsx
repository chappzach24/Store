import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Logo</div>
          
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
          <div className="hidden md:flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
            <a href="/about" className="text-white hover:text-gray-300">About</a>
            <a href="/services" className="text-white hover:text-gray-300">Services</a>
            <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-white hover:text-gray-300">Home</a>
              <a href="/about" className="text-white hover:text-gray-300">About</a>
              <a href="/services" className="text-white hover:text-gray-300">Services</a>
              <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;