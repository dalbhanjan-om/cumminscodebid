import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import DestinationDetails from './pages/DestinationDetails';
import CreatorDashboard from './pages/creator/Dashboard';
import CreateBlog from './pages/creator/CreateBlog';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <nav className="bg-blue-900 text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition duration-150">
                  <Compass className="h-8 w-8" />
                  <span className="font-bold text-xl">TravelGuild</span>
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
                <Link 
                  to="/" 
                  className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/search" 
                  className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search
                </Link>
                <Link 
                  to="/pricing" 
                  className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Plans
                </Link>
                <Link 
                  to="/login" 
                  className="block hover:text-blue-200 px-3 py-2 rounded-md transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destination" element={<DestinationDetails />} />
            <Route path="/creator/dashboard" element={<CreatorDashboard />} />
            <Route path="/creator/create-blog" element={<CreateBlog />} />
          </Routes>
        </main>

        <footer className="bg-blue-900 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Compass className="h-8 w-8" />
                  <span className="font-bold text-xl">TravelGuild</span>
                </div>
                <p className="text-blue-200">Discover the world with our expert travel guides and exclusive destinations.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-blue-200 hover:text-white transition duration-150">Home</Link></li>
                  <li><Link to="/search" className="text-blue-200 hover:text-white transition duration-150">Search</Link></li>
                  <li><Link to="/pricing" className="text-blue-200 hover:text-white transition duration-150">Plans</Link></li>
                  <li><Link to="/login" className="text-blue-200 hover:text-white transition duration-150">Login</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>Email: contact@travelguild.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Travel Street</li>
                  <li>New York, NY 10001</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-blue-200 hover:text-white transition duration-150">Facebook</a></li>
                  <li><a href="#" className="text-blue-200 hover:text-white transition duration-150">Twitter</a></li>
                  <li><a href="#" className="text-blue-200 hover:text-white transition duration-150">Instagram</a></li>
                  <li><a href="#" className="text-blue-200 hover:text-white transition duration-150">LinkedIn</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
              <p>&copy; {new Date().getFullYear()} TravelGuild. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App