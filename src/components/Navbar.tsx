import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage on component mount and when localStorage changes
    const getUserFromLocalStorage = () => {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    
    // Initial load
    getUserFromLocalStorage();
    
    // Listen for storage events (in case localStorage changes in another tab)
    window.addEventListener('storage', getUserFromLocalStorage);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', getUserFromLocalStorage);
    };
  }, [currentUser]); // Add currentUser to the dependency array
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userEmail');
    setCurrentUser(null);
    navigate('/login');
  };

  // Add protected route check
  const isCreatorRoute = (path: string) => {
    return ['/create', '/demo-creator'].includes(path);
  };
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    // Default links when not logged in
    let links = [
      { name: 'Explore', path: '/' },
      { name: 'Search', path: '/search' }
    ];
    
    // Add links based on user role
    if (currentUser) {
     
      
      if (currentUser.role === 'Explorer') {
        links.push({ name: 'Demo Viewer', path: '/demo-viewer' });
      } else if (currentUser.role === 'Creator') {
        links.push({ name: 'Create', path: '/create' });
        links.push({ name: 'Demo Creator', path: '/demo-creator' });
      }
    }
    
    return links;
  };
  
  const navLinks = getNavLinks();
  
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl">Wonderlust</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            {currentUser && (
              <div className="ml-4 flex items-center">
             
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            )}
            
            {!currentUser && (
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full text-left text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            )}
            
            {!currentUser && (
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;