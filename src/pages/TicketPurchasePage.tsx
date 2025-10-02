import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, LockIcon } from "lucide-react";
import kaleeImage from "./kalee.jpg";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

// Mock event data (replace with real fetch later)
const eventData = {
  id: "1",
  title: "KALEE NIGHT",
  date: "10 OCT 2025",
  time: "6.00PM",
  location: "THIKA CAPRICON LOUNGE GATITU JUNCTION",
  image: kaleeImage,
};

export function TicketPurchasePage() {
  const { eventId } = useParams();
  const query = new URLSearchParams(useLocation().search);
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Bring event back
  const event = eventData;

  // 🔥 Load Paystack script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Paystack payment function
  const handlePayment = async (ticketCode: string) => {
  if (!window.PaystackPop) {
    alert("Payment system not loaded. Please refresh and try again.");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, // ✅ loads correctly now
    email: formData.email,
    amount: subtotal * 100, // Paystack expects amount in kobo (KES * 100)
    currency: "KES",
    ref: ticketCode,

    // ❌ don't use async here
    callback: function (response: any) {
      console.log("Payment success:", response);

      // ✅ wrap async logic inside an IIFE
      (async () => {
        try {
          const verifyRes = await fetch(
            `https://ticket-backend-mu.vercel.app/api/paystack/verify/${response.reference}`
          );
          const verifyData = await verifyRes.json();

          if (verifyData.status === "success") {
            await fetch("https://ticket-backend-mu.vercel.app/api/tickets", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ticketCode,
                eventName: event.title,
                eventDate: event.date,
                eventTime: event.time,
                location: event.location,
                ticketType,
                seats: ticketQty,
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
              }),
            });

            navigate(`/confirmation/${ticketCode}`, {
              state: { ticketCode, event, ticketType, ticketQty, ticketPrice, subtotal, formData },
            });
          } else {
            alert("Payment could not be verified. Please try again.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          alert("Error verifying payment.");
        }
      })(); // end async IIFE
    },

    onClose: function () {
      alert("Payment cancelled. Ticket not generated.");
    },
  });

  handler.openIframe();
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticketCode =
      "TKT" + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      await handlePayment(ticketCode);
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
                    <label className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 254712345678"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
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
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
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
