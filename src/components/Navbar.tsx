import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X, Search, User, LogOut, Settings } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your auth logic

  const handleLogout = () => {
    // Add your logout logic here
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition duration-150">
              <Compass className="h-8 w-8" />
              <span className="font-bold text-xl">WonderLust</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/explore" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                Explore
              </Link>
              <Link to="/search" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                Search
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/signin" className="hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                    Sign In
                  </Link>
                  <Link to="/login" className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-150">
                    Login
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 hover:text-blue-200 transition duration-150"
                  >
                    <User className="h-6 w-6" />
                  </button>
                  
                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
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
            <Link to="/explore" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
              Explore
            </Link>
            <Link to="/search" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
              Search
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/signin" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                  Sign In
                </Link>
                <Link to="/login" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                  Profile
                </Link>
                <Link to="/settings" className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
