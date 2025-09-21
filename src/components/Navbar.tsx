import React, { useState } from 'react';
import { MenuIcon, XIcon, TicketIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <TicketIcon className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-indigo-600">
                  KUCOSA TICKETS
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/my-tickets" className="text-gray-600 hover:text-gray-900">
              My Tickets
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/my-tickets" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              My Tickets
            </Link>
            
          </div>
        </div>}
    </nav>;
}