import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PhoneIcon, LockIcon } from "lucide-react";
import kaleeImage from "./kalee.jpg"; 

// Mock event data (replace with real fetch)
const eventData = {
  id: "1",
  title: "KALEE NIGHT",
  date: "10 OCT 2025",
  time: "6.00PM",
  location: "THIKA CAPRICON LOUNGE GATITU JUNCTION",
  image: kaleeImage,
};

// helper to parse query params
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function TicketPurchasePage() {
  const { eventId } = useParams();
  const query = useQuery();
  const navigate = useNavigate();

  const ticketType = query.get("type") || "General";
  const ticketQty = Number(query.get("qty") || 1);
  const ticketPrice = Number(query.get("price") || 0);
  const subtotal = ticketQty * ticketPrice;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mpesaNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const event = eventData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ MPESA payment function
  const handlePayment = async () => {
    try {
      const res = await fetch("https://ticket-backend-mu.vercel.app/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.mpesaNumber || formData.phone,
          amount: subtotal,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Payment failed");
      }

      const data = await res.json();
      console.log("STK push response:", data);
      alert("Check your phone to complete the payment!");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
      throw err; // re-throw to stop further actions
    }
  };

  // ✅ Handle ticket creation and payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticketCode =
      "TKT" + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      // 1️⃣ Save ticket to backend
      const res = await fetch("https://ticket-backend-mu.vercel.app/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketCode,
          eventName: event.title,
          eventDate: event.date,
          eventTime: event.time,
          location: event.location,
          ticketType: ticketType,
          seats: ticketQty,
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save purchase");
      }

      // 2️⃣ Trigger MPESA payment
      await handlePayment();

      // 3️⃣ Navigate to confirmation page
      navigate(`/confirmation/${ticketCode}`, {
        state: {
          ticketCode,
          event,
          ticketType,
          ticketQty,
          ticketPrice,
          subtotal,
          formData,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while processing your purchase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to={`/events/${eventId}`}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Event
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
          <div className="mt-6 md:flex">
            {/* Order Summary */}
            <div className="md:w-1/2 md:pr-8">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
                <div className="mt-4 flex">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-900">
                        {ticketQty}x {ticketType} Ticket
                        {ticketQty > 1 ? "s" : ""}
                      </span>
                      <p className="text-indigo-600 font-semibold">
                        Ksh {subtotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="text-gray-900">
                      Ksh {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="mpesaNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      id="mpesaNumber"
                      name="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 254712345678"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      You will receive a prompt on your phone to complete the
                      payment.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center">
                  <LockIcon className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Complete Purchase"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
