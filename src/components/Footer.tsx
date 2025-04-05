import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">WonderLust</h3>
            <p className="text-sm text-blue-200">Your ultimate travel companion</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-blue-200 hover:text-white">Explore</Link></li>
              <li><Link to="/pricing" className="text-blue-200 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} WonderLust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
