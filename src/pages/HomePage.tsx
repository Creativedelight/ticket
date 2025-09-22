import React from 'react';
import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import { CalendarIcon, SearchIcon, TicketIcon, TrendingUpIcon, MapPinIcon } from 'lucide-react';
import kaleeImage from "./kalee.jpg"; 



export function HomePageHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100); // slight delay for animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={kaleeImage}
        alt="KALEE Night"
        className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-2000 ease-in-out
          ${loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-110 blur-md"}`}
      />

      {/* Overlay gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          KALEE NIGHT
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
          Experience the biggest KALEE NIGHT of the year with unforgettable
          performances, lights, and vibes.
        </p>
        <Link
          to="/events/kalee-night"
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          Get Tickets
        </Link>
      </div>
    </div>
  );
}
     
      {/* Featured Event (replaces Upcoming Events) */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Upcoming Event
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={kaleeImage}
                  alt="Rock Concert"
                  className="h-64 w-full object-cover md:h-full"
                />

              </div>
              <div className="p-8 md:w-1/2">
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  KALEE NIGHT
                </h2>
                <div className="mt-4 flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>FRI 10,OCT 2025 6PM TILL LATE</span>
                </div>
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>THIKA CAPRICON LOUNGE GATITU JUNCTION</span>
                </div>
                <p className="mt-4 text-gray-600">
                  Experience the biggest KALEE NIGHT of the year with performances from
                  Samkey Star, Gloria Kotestes, Yoyo Zing, Zona Last Born and Tobby Mr.Romantic. Don't miss this epic,
                  lights, and unforgettable moments.
                </p>
                <div className="mt-6">
                  <Link
                    to="/events/kalee night"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <TicketIcon className="h-5 w-5 mr-2" />
                    Get Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get your tickets in three simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <SearchIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Find Your Event
              </h3>
              <p className="mt-2 text-base text-gray-500">
                
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <TicketIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Select Your Tickets
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Choose your preferred ticket type.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <TrendingUpIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Secure Payment
              </h3>
              <p className="mt-2 text-base text-gray-500">
                Pay securely using mpesa method and get instant ticket delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Stay updated on new events
              </h2>
              <p className="mt-3 max-w-md text-lg text-indigo-200">
                Subscribe to our newsletter and be the first to know about
                upcoming events and exclusive offers.
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-white border-white rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                We care about your data. Read our{" "}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
