import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, SearchIcon, TicketIcon, TrendingUpIcon, MapPinIcon } from 'lucide-react';
import { EventCard } from '../components/EventCard';
// Mock data for upcoming events
const upcomingEvents = [{
  id: '1',
  title: 'Summer Music Festival',
  date: 'Jul 15, 2023',
  location: 'Central Park, New York',
  image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  category: 'Music',
  price: 89.99
}, {
  id: '2',
  title: 'Tech Conference 2023',
  date: 'Aug 10, 2023',
  location: 'Convention Center, San Francisco',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  category: 'Conference',
  price: 149.99
}, {
  id: '3',
  title: 'Comedy Night with John Smith',
  date: 'Jul 22, 2023',
  location: 'Laugh Factory, Los Angeles',
  image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  category: 'Comedy',
  price: 49.99
}, {
  id: '4',
  title: 'Basketball Championship Finals',
  date: 'Jul 28, 2023',
  location: 'Sports Arena, Chicago',
  image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  category: 'Sports',
  price: 120.0
}];
// Mock data for categories
const categories = [{
  name: 'Music',
  icon: '🎵',
  color: 'bg-pink-500'
}, {
  name: 'Sports',
  icon: '🏆',
  color: 'bg-blue-500'
}, {
  name: 'Theatre',
  icon: '🎭',
  color: 'bg-purple-500'
}, {
  name: 'Comedy',
  icon: '😂',
  color: 'bg-yellow-500'
}, {
  name: 'Conference',
  icon: '🎤',
  color: 'bg-green-500'
}, {
  name: 'Workshop',
  icon: '🛠️',
  color: 'bg-red-500'
}];
export function HomePage() {
  return <div>
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Discover Amazing Events
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Find and book tickets for concerts, sports, theatre, comedy, and
              more events near you.
            </p>
            <div className="mt-10 max-w-xl mx-auto">
              <div className="flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 text-gray-900" placeholder="Search for events, artists, teams..." />
                </div>
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Browse Categories
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map(category => <Link key={category.name} to={`/events?category=${category.name}`} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <div className={`${category.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-900">
                  {category.name}
                </span>
              </Link>)}
          </div>
        </div>
      </div>
      {/* Upcoming Events Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Upcoming Events
            </h2>
            <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              View All
              <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map(event => <EventCard key={event.id} id={event.id} title={event.title} date={event.date} location={event.location} image={event.image} category={event.category} price={event.price} />)}
          </div>
        </div>
      </div>
      {/* Featured Event */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Rock Concert" className="h-64 w-full object-cover md:h-full" />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  Featured Event
                </div>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  Rock in the City 2023
                </h2>
                <div className="mt-4 flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>August 20, 2023 • 7:00 PM</span>
                </div>
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>Downtown Arena, New York</span>
                </div>
                <p className="mt-4 text-gray-600">
                  Experience the biggest rock event of the year with
                  performances from legendary bands and rising stars. Don't miss
                  this epic night of music, lights, and unforgettable moments.
                </p>
                <div className="mt-6">
                  <Link to="/events/5" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
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
                Browse events by category, search for your favorite artists, or
                explore what's happening near you.
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
                Choose your preferred seats, ticket type, and the number of
                tickets you need.
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
                Pay securely using your preferred payment method and get instant
                ticket delivery.
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
                <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-white border-white rounded-md" placeholder="Enter your email" />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                We care about your data. Read our{' '}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}