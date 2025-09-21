import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, TagIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SeatMap } from '../components/SeatMap';
// Mock event data
const eventData = {
  id: '5',
  title: 'Rock in the City 2023',
  date: 'August 20, 2023',
  time: '7:00 PM',
  location: 'Downtown Arena, New York',
  images: ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
  category: 'Music',
  organizer: 'City Events Inc.',
  description: `
    <p>Experience the biggest rock event of the year with performances from legendary bands and rising stars. Rock in the City 2023 brings together the best rock artists for an unforgettable night of music, lights, and energy.</p>
    <p>This year's lineup includes:</p>
    <ul>
      <li>The Rolling Stones</li>
      <li>Foo Fighters</li>
      <li>Imagine Dragons</li>
      <li>Greta Van Fleet</li>
      <li>And many more!</li>
    </ul>
    <p>Doors open at 5:00 PM. The show starts at 7:00 PM.</p>
    <p>Food and beverages will be available for purchase inside the venue. Outside food and drinks are not permitted.</p>
  `,
  ticketTypes: [{
    id: 'vvip',
    name: 'VVIP',
    price: 299.99,
    description: 'Front row seating, exclusive backstage access, complimentary drinks'
  }, {
    id: 'vip',
    name: 'VIP',
    price: 199.99,
    description: 'Premium seating, early entry, merchandise pack'
  }, {
    id: 'regular',
    name: 'Regular',
    price: 99.99,
    description: 'General admission'
  }]
};
// Mock seat data
const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seatsPerRow = 20;
  const seats = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 1; j <= seatsPerRow; j++) {
      let category: 'VVIP' | 'VIP' | 'Regular';
      let price: number;
      if (i < 2) {
        category = 'VVIP';
        price = 299.99;
      } else if (i < 5) {
        category = 'VIP';
        price = 199.99;
      } else {
        category = 'Regular';
        price = 99.99;
      }
      // Make some seats unavailable randomly
      const isAvailable = Math.random() > 0.2;
      seats.push({
        id: `${row}${j}`,
        row,
        number: j,
        category,
        price,
        isAvailable
      });
    }
  }
  return seats;
};
export function EventDetailPage() {
  const {
    eventId
  } = useParams<{
    eventId: string;
  }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  // In a real app, you would fetch the event data based on eventId
  const event = eventData;
  const seats = generateSeats();
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % event.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + event.images.length) % event.images.length);
  };
  const handleTicketTypeChange = (ticketTypeId: string) => {
    setSelectedTicketType(ticketTypeId);
    setSelectedSeats([]);
    setShowSeatMap(true);
  };
  const handleSeatSelect = (seats: any[]) => {
    setSelectedSeats(seats);
    setQuantity(seats.length);
  };
  const getSelectedTicketPrice = () => {
    if (!selectedTicketType) return 0;
    const ticketType = event.ticketTypes.find(t => t.id === selectedTicketType);
    return ticketType ? ticketType.price : 0;
  };
  const totalPrice = selectedSeats.length > 0 ? selectedSeats.reduce((sum, seat) => sum + seat.price, 0) : getSelectedTicketPrice() * quantity;
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/events" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Events
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-64 sm:h-96">
          <img src={event.images[currentImageIndex]} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button onClick={prevImage} className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button onClick={nextImage} className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentImageIndex + 1} / {event.images.length}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {event.title}
              </h1>
              <div className="mt-2 flex flex-wrap gap-y-2">
                <div className="mr-6 flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="mr-6 flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="mr-6 flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {event.category}
              </span>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-600">
              Organized by {event.organizer}
            </span>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              About This Event
            </h2>
            <div className="mt-4 prose prose-indigo" dangerouslySetInnerHTML={{
            __html: event.description
          }} />
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Get Tickets</h2>
            <div className="mt-4 space-y-4">
              {event.ticketTypes.map(ticketType => <div key={ticketType.id} className={`border rounded-lg p-4 ${selectedTicketType === ticketType.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ticketType.name}
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {ticketType.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-600">
                        ${ticketType.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={selectedTicketType !== ticketType.id || showSeatMap} className="p-2 border border-gray-300 rounded-l disabled:opacity-50">
                        -
                      </button>
                      <input type="number" min="1" value={selectedTicketType === ticketType.id ? quantity : 1} readOnly className="w-12 text-center border-t border-b border-gray-300 py-2" />
                      <button onClick={() => setQuantity(quantity + 1)} disabled={selectedTicketType !== ticketType.id || showSeatMap} className="p-2 border border-gray-300 rounded-r disabled:opacity-50">
                        +
                      </button>
                    </div>
                    <button onClick={() => handleTicketTypeChange(ticketType.id)} className={`px-4 py-2 rounded ${selectedTicketType === ticketType.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      {selectedTicketType === ticketType.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>)}
            </div>
            {showSeatMap && <div className="mt-6">
                <SeatMap seats={seats} onSeatSelect={handleSeatSelect} />
              </div>}
            {selectedTicketType && <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {showSeatMap && selectedSeats.length > 0 ? `${selectedSeats.length} seats selected` : `${quantity} x ${event.ticketTypes.find(t => t.id === selectedTicketType)?.name}`}
                    </p>
                    <p className="text-xl font-bold text-indigo-600">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to={`/purchase/${event.id}`} className="block w-full text-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}