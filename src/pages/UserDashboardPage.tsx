import React, { useState } from 'react';
import { TicketIcon, UserIcon, CreditCardIcon, SettingsIcon } from 'lucide-react';
import { TicketCard } from '../components/TicketCard';
// Mock ticket data
const ticketsData = [{
  id: 'TKT123456789',
  eventName: 'Rock in the City 2023',
  eventDate: 'August 20, 2023',
  eventTime: '7:00 PM',
  location: 'Downtown Arena, New York',
  ticketType: 'VIP',
  seatInfo: 'Section A, Row 3, Seat 12',
  ticketCode: 'TKT123456789',
  eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}, {
  id: 'TKT987654321',
  eventName: 'Summer Music Festival',
  eventDate: 'July 15, 2023',
  eventTime: '2:00 PM',
  location: 'Central Park, New York',
  ticketType: 'General Admission',
  seatInfo: 'GA',
  ticketCode: 'TKT987654321',
  eventImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}, {
  id: 'TKT456789123',
  eventName: 'Comedy Night with John Smith',
  eventDate: 'July 22, 2023',
  eventTime: '8:00 PM',
  location: 'Laugh Factory, Los Angeles',
  ticketType: 'Front Row',
  seatInfo: 'Row 1, Seat 5',
  ticketCode: 'TKT456789123',
  eventImage: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
}];
export function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [filterStatus, setFilterStatus] = useState('all');
  // Filter tickets based on event date
  const now = new Date();
  const filteredTickets = ticketsData.filter(ticket => {
    const eventDate = new Date(ticket.eventDate);
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming' && eventDate >= now) return true;
    if (filterStatus === 'past' && eventDate < now) return true;
    return false;
  });
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('tickets')} className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'tickets' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <TicketIcon className="h-5 w-5 mr-2" />
                My Tickets
              </button>
              <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </button>
              <button onClick={() => setActiveTab('payment')} className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'payment' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Payment Methods
              </button>
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <SettingsIcon className="h-5 w-5 mr-2" />
                Settings
              </button>
            </nav>
          </div>
          {/* Main content */}
          <div className="md:flex-1 p-6">
            {activeTab === 'tickets' && <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">
                    My Tickets
                  </h1>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex space-x-2">
                      <button onClick={() => setFilterStatus('all')} className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        All
                      </button>
                      <button onClick={() => setFilterStatus('upcoming')} className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        Upcoming
                      </button>
                      <button onClick={() => setFilterStatus('past')} className={`px-3 py-1 rounded-md text-sm font-medium ${filterStatus === 'past' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        Past
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  {filteredTickets.length === 0 ? <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        No tickets found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You don't have any{' '}
                        {filterStatus !== 'all' ? filterStatus : ''} tickets
                        yet.
                      </p>
                    </div> : filteredTickets.map(ticket => <TicketCard key={ticket.id} id={ticket.id} eventName={ticket.eventName} eventDate={ticket.eventDate} eventTime={ticket.eventTime} location={ticket.location} ticketType={ticket.ticketType} seatInfo={ticket.seatInfo} ticketCode={ticket.ticketCode} eventImage={ticket.eventImage} />)}
                </div>
              </div>}
            {activeTab === 'profile' && <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="mt-1 text-gray-600">
                  Manage your personal information
                </p>
                <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Personal Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Update your personal details
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          John Doe
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          john.doe@example.com
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          +1 (555) 123-4567
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          123 Main St, Apt 4B
                          <br />
                          New York, NY 10001
                          <br />
                          United States
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    Edit Profile
                  </button>
                </div>
              </div>}
            {activeTab === 'payment' && <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Payment Methods
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage your payment methods
                </p>
                <div className="mt-6">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Saved Payment Methods
                      </h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded">
                            <CreditCardIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Visa ending in 4242
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <button type="button" className="text-sm text-indigo-600 hover:text-indigo-800">
                          Remove
                        </button>
                      </div>
                      <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-2 rounded">
                            <PhoneIcon className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              M-Pesa
                            </p>
                            <p className="text-sm text-gray-500">
                              +254 712 345 678
                            </p>
                          </div>
                        </div>
                        <button type="button" className="text-sm text-indigo-600 hover:text-indigo-800">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </div>}
            {activeTab === 'settings' && <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-1 text-gray-600">
                  Manage your account settings
                </p>
                <div className="mt-6">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Notification Preferences
                      </h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="email_notifications" name="email_notifications" type="checkbox" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email_notifications" className="font-medium text-gray-700">
                              Email notifications
                            </label>
                            <p className="text-gray-500">
                              Get notified about new events and ticket purchases
                              via email
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="sms_notifications" name="sms_notifications" type="checkbox" defaultChecked className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sms_notifications" className="font-medium text-gray-700">
                              SMS notifications
                            </label>
                            <p className="text-gray-500">
                              Receive text messages for important updates about
                              your tickets
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="marketing_notifications" name="marketing_notifications" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketing_notifications" className="font-medium text-gray-700">
                              Marketing communications
                            </label>
                            <p className="text-gray-500">
                              Receive updates about promotions and special
                              offers
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Account Security
                      </h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5">
                      <div className="space-y-4">
                        <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Change Password
                        </button>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="two_factor" name="two_factor" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="two_factor" className="font-medium text-gray-700">
                              Enable two-factor authentication
                            </label>
                            <p className="text-gray-500">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}