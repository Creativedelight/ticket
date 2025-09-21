import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon, DownloadIcon, PrinterIcon, CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { QRCode } from '../components/QRCode';
// Mock ticket data
const ticketData = {
  id: 'TKT123456789',
  event: {
    id: '5',
    title: 'Rock in the City 2023',
    date: 'August 20, 2023',
    time: '7:00 PM',
    location: 'Downtown Arena, New York',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  ticketType: 'VIP',
  seatInfo: 'Section A, Row 3, Seat 12',
  purchaseDate: 'July 15, 2023',
  purchaseTime: '10:30 AM',
  price: 199.99,
  serviceFee: 10.0,
  total: 209.99
};
export function ConfirmationPage() {
  const {
    ticketId
  } = useParams<{
    ticketId: string;
  }>();
  // In a real app, you would fetch the ticket data based on ticketId
  const ticket = {
    ...ticketData,
    id: ticketId || ticketData.id
  };
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
          Purchase Successful!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your tickets have been confirmed and sent to your email.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {ticket.event.title}
              </h2>
              <div className="mt-2 flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span>{ticket.event.date}</span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <ClockIcon className="h-5 w-5 mr-2" />
                <span>{ticket.event.time}</span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span>{ticket.event.location}</span>
              </div>
            </div>
            <img src={ticket.event.image} alt={ticket.event.title} className="hidden md:block h-24 w-24 object-cover rounded" />
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {ticket.ticketType}
              </div>
              <p className="mt-2 text-gray-700">Seat: {ticket.seatInfo}</p>
              <p className="text-gray-700">Ticket #: {ticket.id}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center justify-center">
              <QRCode value={ticket.id} size={120} />
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Details
            </h3>
            <div className="mt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Purchase Date</span>
                <span className="text-gray-900">
                  {ticket.purchaseDate} at {ticket.purchaseTime}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100">
                <span className="text-gray-600">Ticket Price</span>
                <span className="text-gray-900">
                  ${ticket.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-900">
                  ${ticket.serviceFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-100 font-semibold">
                <span>Total</span>
                <span>${ticket.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <DownloadIcon className="h-5 w-5 mr-2" />
              Download Ticket
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <PrinterIcon className="h-5 w-5 mr-2" />
              Print Ticket
            </button>
            <Link to="/my-tickets" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              View My Tickets
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Have questions about your order?{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-800">
            Contact Support
          </a>
        </p>
      </div>
    </div>;
}