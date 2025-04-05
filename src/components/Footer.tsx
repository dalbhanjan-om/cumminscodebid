import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

function Footer() {
  return (
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
  );
}

export default Footer;
