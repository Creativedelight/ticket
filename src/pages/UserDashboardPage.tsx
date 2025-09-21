import React, { useState } from 'react';
import { TicketIcon } from 'lucide-react';
import { TicketCard } from '../components/TicketCard';
import './TicketPage.css';

interface Ticket {
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

export function UserDashboardPage() {
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchTickets = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setTickets([]);

  try {
    const res = await fetch(`http://localhost:4000/api/tickets?email=${email}`);
    if (!res.ok) throw new Error('Failed to fetch tickets');

    const data = await res.json();
    if (data.length === 0) {
      setError('No tickets found for this email.');
    } else {
      // Map backend data to frontend Ticket interface
      const mappedTickets = data.map((t: any) => ({
        id: t.ticket_id,
        eventName: `Event #${t.event_id}`, // you can replace with actual event name from events table
        eventDate: t.event_date || 'TBD', // optional: fetch from events table
        eventTime: t.event_time || 'TBD',
        location: t.location || 'TBD',
        ticketType: t.ticket_type,
        seatInfo: `${t.ticket_qty} ticket(s)`,
        ticketCode: t.ticket_id, // will be used for QR code or download
        eventImage: t.event_image || '/default-event.jpg',
      }));

      setTickets(mappedTickets);
    }
  } catch (err) {
    console.error(err);
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {/* Email input to fetch tickets */}
      <form onSubmit={handleFetchTickets} className="mb-6 flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Get Tickets'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col gap-6">
        {tickets.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No tickets found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter your email above to retrieve your tickets.
            </p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              eventName={ticket.eventName}
              eventDate={ticket.eventDate}
              eventTime={ticket.eventTime}
              location={ticket.location}
              ticketType={ticket.ticketType}
              seatInfo={ticket.seatInfo}
              ticketCode={ticket.ticketCode}
              eventImage={ticket.eventImage}
            />
          ))
        )}
      </div>
    </div>
  );
}
