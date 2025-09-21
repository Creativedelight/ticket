import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TicketIcon, UsersIcon, DollarSignIcon, CalendarIcon, PlusIcon, EditIcon, TrashIcon, MoreVerticalIcon, SearchIcon } from 'lucide-react';
import { AdminCard } from '../components/AdminCard';
// Mock data for dashboard
const dashboardData = {
  totalEvents: 24,
  totalTicketsSold: 1842,
  totalRevenue: '$52,649.00',
  activeEvents: 8
};
// Mock data for events
const eventsData = [{
  id: '1',
  title: 'Summer Music Festival',
  date: 'Jul 15, 2023',
  location: 'Central Park, New York',
  category: 'Music',
  ticketsSold: 750,
  revenue: '$67,500.00',
  status: 'Active'
}, {
  id: '2',
  title: 'Tech Conference 2023',
  date: 'Aug 10, 2023',
  location: 'Convention Center, San Francisco',
  category: 'Conference',
  ticketsSold: 420,
  revenue: '$63,000.00',
  status: 'Active'
}, {
  id: '3',
  title: 'Comedy Night with John Smith',
  date: 'Jul 22, 2023',
  location: 'Laugh Factory, Los Angeles',
  category: 'Comedy',
  ticketsSold: 180,
  revenue: '$8,100.00',
  status: 'Active'
}, {
  id: '4',
  title: 'Basketball Championship Finals',
  date: 'Jul 28, 2023',
  location: 'Sports Arena, Chicago',
  category: 'Sports',
  ticketsSold: 1200,
  revenue: '$144,000.00',
  status: 'Active'
}, {
  id: '5',
  title: 'Rock in the City 2023',
  date: 'Aug 20, 2023',
  location: 'Downtown Arena, New York',
  category: 'Music',
  ticketsSold: 850,
  revenue: '$80,750.00',
  status: 'Active'
}];
export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  // Filter events based on search term
  const filteredEvents = eventsData.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.location.toLowerCase().includes(searchTerm.toLowerCase()) || event.category.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-4 md:mt-0">
          <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Event
          </button>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('events')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'events' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Events
          </button>
          <button onClick={() => setActiveTab('tickets')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'tickets' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Tickets
          </button>
          <button onClick={() => setActiveTab('users')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Users
          </button>
          <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'reports' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            Reports
          </button>
        </div>
      </div>
      {activeTab === 'overview' && <div className="mt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AdminCard title="Total Events" value={dashboardData.totalEvents} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} trend={{
          value: 12,
          isPositive: true
        }} />
            <AdminCard title="Tickets Sold" value={dashboardData.totalTicketsSold} icon={<TicketIcon className="h-6 w-6 text-indigo-600" />} trend={{
          value: 8,
          isPositive: true
        }} />
            <AdminCard title="Total Revenue" value={dashboardData.totalRevenue} icon={<DollarSignIcon className="h-6 w-6 text-indigo-600" />} trend={{
          value: 5,
          isPositive: true
        }} />
            <AdminCard title="Active Events" value={dashboardData.activeEvents} icon={<CalendarIcon className="h-6 w-6 text-indigo-600" />} />
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Events</h2>
            <div className="mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Event
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Tickets Sold
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Revenue
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {eventsData.slice(0, 5).map(event => <tr key={event.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {event.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.date}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.ticketsSold}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {event.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-right">
              <button onClick={() => setActiveTab('events')} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View all events
              </button>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Sales
                </h3>
                <div className="mt-4">
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          John Doe
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          2x VIP tickets for Rock in the City 2023
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Jane Smith
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          1x Regular ticket for Summer Music Festival
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Mike Johnson
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          4x Regular tickets for Basketball Championship Finals
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Sarah Williams
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          2x Front Row tickets for Comedy Night with John Smith
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Upcoming Events
                </h3>
                <div className="mt-4">
                  <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                      {eventsData.slice(0, 4).map(event => <li key={event.id} className="py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {event.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {event.date} • {event.location}
                              </p>
                            </div>
                            <div>
                              <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                Manage
                              </button>
                            </div>
                          </div>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {activeTab === 'events' && <div className="mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">All Events</h2>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="relative flex-grow max-w-xs mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>All Categories</option>
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Theatre</option>
                  <option>Comedy</option>
                  <option>Conference</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Event
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Tickets Sold
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Revenue
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredEvents.map(event => <tr key={event.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {event.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.ticketsSold}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {event.revenue}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {event.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                          <EditIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 mr-2">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {filteredEvents.length === 0 && <div className="text-center py-12">
              <p className="text-sm text-gray-500">
                No events match your search criteria.
              </p>
            </div>}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{filteredEvents.length}</span> of{' '}
              <span className="font-medium">{filteredEvents.length}</span>{' '}
              results
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>}
      {activeTab === 'tickets' && <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">
            Ticket Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This section allows you to manage tickets for all events. You can
            view ticket sales, refunds, and other ticket-related information.
          </p>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <p className="text-center text-gray-500">
              Ticket management interface would be displayed here.
            </p>
          </div>
        </div>}
      {activeTab === 'users' && <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            This section allows you to manage users of the platform. You can
            view user details, edit user information, and manage user
            permissions.
          </p>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <p className="text-center text-gray-500">
              User management interface would be displayed here.
            </p>
          </div>
        </div>}
      {activeTab === 'reports' && <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Reports</h2>
          <p className="mt-1 text-sm text-gray-500">
            This section provides various reports and analytics about events,
            ticket sales, revenue, and user engagement.
          </p>
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <p className="text-center text-gray-500">
              Reports and analytics would be displayed here.
            </p>
          </div>
        </div>}
    </div>;
}