import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition duration-150">
              <Compass className="h-8 w-8" />
              <span className="font-bold text-xl">WonderLust</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">Home</Link>
              <Link to="/search" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">Search</Link>
              <Link to="/pricing" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">Plans</Link>
              <Link to="/login" className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-150">Login</Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition duration-150"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-blue-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { to: "/", text: "Home" },
              { to: "/search", text: "Search" },
              { to: "/pricing", text: "Plans" },
              { to: "/login", text: "Login" }
            ].map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
