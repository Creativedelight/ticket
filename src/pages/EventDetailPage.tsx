import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import kaleeImage from "./kalee.jpg"; 

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

// Mock event data
const eventData = {
  id: "5",
  title: "Kalee Night 2025",
  date: "10 OCT 2025",
  time: "6:00 PM",
  location: "THIKA CAPRICON LOUNGE GATITU JUNCTION",
  image: kaleeImage,
  category: "Music Concert",
  organizer: "Kalee Entertainment",
  description: `
    <p>Experience the biggest Kalee night event of the year with performances from legendary bands and rising stars. Kalee night 2025 brings an unforgettable night of music, lights, and energy.</p>

    <p>The show starts at 6:00 PM. till late</p>
  `,
  ticketTypes: [
    {
      id: "vvip",
      name: "VVIP",
      price: 2000,
      description:
        "Front row seating, exclusive backstage access, complimentary drinks",
    },
    {
      id: "vip",
      name: "VIP",
      price: 1000,
      description: "Premium seating, early entry, merchandise pack",
    },
    {
      id: "couples",
      name: "Couples",
      price: 900,
      description: "Ticket package for two",
    },
    {
      id: "diehard",
      name: "DIE HARD",
      price: 500,
      description: "Standard entry ticket",
    },
  ],
};

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const event = eventData;

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % event.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + event.image.length) % event.image.length
    );
  };

  const selectedTicket = event.ticketTypes.find(
    (t) => t.id === selectedTicketType
  );
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/events"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        Back to Events
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-64 sm:h-96">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 focus:outline-none"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {currentImageIndex + 1} / {event.image.length}
          </div>
        </div>

        <div className="p-6">
          {/* Event Details */}
          <div className="flex flex-wrap items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
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

          {/* About Event */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              About This Event
            </h2>
            <div
              className="mt-4 prose prose-indigo"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>

          {/* Tickets */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Get Tickets</h2>
            <div className="mt-4 space-y-4">
              {event.ticketTypes.map((ticketType) => (
                <div
                  key={ticketType.id}
                  className={`border rounded-lg p-4 ${
                    selectedTicketType === ticketType.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ticketType.name}
                      </h3>
                      {ticketType.description && (
                        <p className="mt-1 text-gray-600">
                          {ticketType.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-600">
                        Ksh {ticketType.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={selectedTicketType !== ticketType.id}
                        className="p-2 border border-gray-300 rounded-l disabled:opacity-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={
                          selectedTicketType === ticketType.id ? quantity : 1
                        }
                        readOnly
                        className="w-12 text-center border-t border-b border-gray-300 py-2"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={selectedTicketType !== ticketType.id}
                        className="p-2 border border-gray-300 rounded-r disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => setSelectedTicketType(ticketType.id)}
                      className={`px-4 py-2 rounded ${
                        selectedTicketType === ticketType.id
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {selectedTicketType === ticketType.id
                        ? "Selected"
                        : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            {selectedTicket && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order Summary
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {quantity} x {selectedTicket.name}
                    </p>
                    <p className="text-xl font-bold text-indigo-600">
                      Ksh {totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/purchase/${event.id}?type=${selectedTicket.id}&qty=${quantity}&price=${selectedTicket.price}`}
                    className="block w-full text-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
