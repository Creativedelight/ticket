import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { QRCode } from './QRCode';
interface TicketCardProps {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketType: string;
  seatInfo: string;
  ticketCode: string;
  eventImage: string;
}
export function TicketCard({
  id,
  eventName,
  eventDate,
  eventTime,
  location,
  ticketType,
  seatInfo,
  ticketCode,
  eventImage
}: TicketCardProps) {
  return <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img src={eventImage} alt={eventName} className="w-full h-48 md:h-full object-cover" />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{eventName}</h3>
              <div className="mt-2 flex items-center text-gray-600">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{eventDate}</span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>{eventTime}</span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {ticketType}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                  Seat: {seatInfo}
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <QRCode value={ticketCode} size={100} />
            </div>
          </div>
          <div className="md:hidden mt-4 flex justify-center">
            <QRCode value={ticketCode} size={150} />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition">
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print
            </button>
            <Link to={`/events/${id}`} className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition ml-auto">
              Event Details
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Ticket Code: {ticketCode}</p>
            <p className="text-xs text-gray-500 mt-1">
              Present this ticket (printed or digital) at the entrance.
            </p>
          </div>
        </div>
      </div>
    </div>;
}