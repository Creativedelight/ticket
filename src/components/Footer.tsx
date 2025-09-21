import React from 'react';
import { Link } from 'react-router-dom';
import { TicketIcon, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
export function Footer() {
  return <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <TicketIcon className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">
                KUCOSA TICKETS
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Your one-stop destination for all event tickets. Find, book, and
              enjoy events with ease.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/events" className="text-base text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-tickets" className="text-base text-gray-400 hover:text-white">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-400 hover:text-white">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-400 md:mt-0">
            &copy; {new Date().getFullYear()} KUCOSA, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
}