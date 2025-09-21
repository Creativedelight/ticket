import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Download, Printer } from "lucide-react";

export function ConfirmationPage() {
  const { ticketId } = useParams();
  const location = useLocation();

  // data passed from purchase page
  const {
    event,
    ticketType,
    ticketQty,
    subtotal,
    formData,
  } = (location.state as any) || {};

  // ✅ Handle ticket download (as text file for now)
  const handleDownload = () => {
    const ticketContent = `
Ticket ID: ${ticketId}
Event: ${event?.title}
Date: ${event?.date} at ${event?.time}
Location: ${event?.location}
Ticket: ${ticketQty}x ${ticketType}
Total Paid: Ksh ${subtotal?.toLocaleString()}

Buyer:
${formData?.firstName} ${formData?.lastName}
${formData?.email}
${formData?.phone}
    `;

    const blob = new Blob([ticketContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-${ticketId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ✅ Handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Purchase Successful 🎉
      </h1>

      <p className="text-gray-700 mb-6">
        Thank you for your purchase! Your ticket details are below.
      </p>

      {/* Ticket ID */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-500">Ticket ID</p>
        <p className="text-lg font-semibold text-gray-900">{ticketId}</p>
      </div>

      {/* Event Details */}
      {event && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Event Details
          </h2>
          <p className="font-medium">{event.title}</p>
          <p className="text-sm text-gray-600">
            {event.date} • {event.time}
          </p>
          <p className="text-sm text-gray-600">{event.location}</p>
        </div>
      )}

      {/* Ticket Info */}
      {ticketType && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Ticket Info
          </h2>
          <p>
            {ticketQty}x {ticketType} Ticket{ticketQty > 1 ? "s" : ""}
          </p>
          <p className="text-indigo-600 font-semibold">
            Ksh {subtotal?.toLocaleString()}
          </p>
        </div>
      )}

      {/* Buyer Info */}
      {formData && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Buyer Information
          </h2>
          <p>
            {formData.firstName} {formData.lastName}
          </p>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-md shadow hover:bg-indigo-700"
        >
          <Download className="h-5 w-5" />
          Download Ticket
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-5 py-3 rounded-md shadow hover:bg-gray-200"
        >
          <Printer className="h-5 w-5" />
          Print Ticket
        </button>

        <Link
          to="/"
          className="flex items-center justify-center bg-green-600 text-white px-5 py-3 rounded-md shadow hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
