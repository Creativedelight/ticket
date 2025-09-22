import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
import { QRCode } from './QRCode';

interface TicketCardProps {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  ticketType: string;
  seats: string;  
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
  seats,
  ticketCode,
  eventImage
}: TicketCardProps) {


  const handleDownload = () => {
  const element = document.createElement('a');
  const file = new Blob([`Ticket Code: ${ticketCode}\nEvent: ${eventName}\nDate: ${eventDate}\nTime: ${eventTime}\nLocation: ${location}\nTicket Type: ${ticketType}\nSeats: ${seats}`], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = `Ticket-${ticketCode}.txt`;
  document.body.appendChild(element);
  element.click();
}
const handlePrint = () => {
  const printContent = `
    <h1>${eventName}</h1>
    <p>Date: ${eventDate}</p>
    <p>Time: ${eventTime}</p>
    <p>Location: ${location}</p>
    <p>Ticket Type: ${ticketType}</p>
    <p>Seats: ${seats}</p>
    <p>Ticket Code: ${ticketCode}</p>
  `;
  const newWin = window.open('', '', 'width=600,height=400');
  newWin?.document.write(printContent);
  newWin?.document.close();
  newWin?.print();
};


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
      <img src={eventImage} alt={eventName} className="w-full md:w-48 h-32 object-cover rounded" />
      <div className="flex-1">
        <h2 className="font-bold text-lg">{eventName}</h2>
        <p className="text-sm text-gray-600"><CalendarIcon className="inline h-4 w-4 mr-1"/> {eventDate}</p>
        <p className="text-sm text-gray-600"><ClockIcon className="inline h-4 w-4 mr-1"/> {eventTime}</p>
        <p className="text-sm text-gray-600"><MapPinIcon className="inline h-4 w-4 mr-1"/> {location}</p>
        <p className="text-sm text-gray-600">Type: {ticketType}</p>
        <p className="text-sm text-gray-600">Seats: {seats}</p>
        <QRCode value={ticketCode} /> {/* QR code for scanning */}
        <div className="mt-2 flex gap-2">
          <button onClick={handleDownload} className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            <DownloadIcon className="h-4 w-4"/> Download
          </button>
          <button onClick={handlePrint} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            <PrinterIcon className="h-4 w-4"/> Print
          </button>
        </div>
      </div>
    </div>
  );
}
