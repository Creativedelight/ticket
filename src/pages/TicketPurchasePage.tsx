import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, PhoneIcon, LockIcon } from 'lucide-react';
// Mock event data
const eventData = {
  id: '5',
  title: 'Rock in the City 2023',
  date: 'August 20, 2023',
  time: '7:00 PM',
  location: 'Downtown Arena, New York',
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
};
export function TicketPurchasePage() {
  const {
    eventId
  } = useParams<{
    eventId: string;
  }>();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mpesaNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // In a real app, you would fetch the event and selected tickets data
  const event = eventData;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send the form data to your backend
      // and handle the payment processing
      const ticketId = 'TKT' + Math.random().toString(36).substr(2, 9).toUpperCase();
      window.location.href = `/confirmation/${ticketId}`;
    }, 2000);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to={`/events/${eventId}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back to Event
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Complete Your Purchase
          </h1>
          <div className="mt-6 md:flex">
            <div className="md:w-1/2 md:pr-8">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
                <div className="mt-4 flex">
                  <img src={event.image} alt={event.title} className="h-24 w-24 object-cover rounded" />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-900">
                        2x VIP Tickets
                      </span>
                      <p className="text-indigo-600 font-semibold">$399.98</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">$399.98</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="text-gray-900">$19.99</span>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-indigo-600">
                      $419.97
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payment Method
                  </h2>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input id="mpesa" name="paymentMethod" type="radio" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="mpesa" className="ml-3 block text-sm font-medium text-gray-700 flex items-center">
                        <PhoneIcon className="h-5 w-5 text-green-500 mr-2" />
                        M-Pesa
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="card" name="paymentMethod" type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                      <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700 flex items-center">
                        <CreditCardIcon className="h-5 w-5 text-blue-500 mr-2" />
                        Credit / Debit Card
                      </label>
                    </div>
                  </div>
                  {paymentMethod === 'mpesa' && <div className="mt-4">
                      <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700">
                        M-Pesa Phone Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input type="tel" name="mpesaNumber" id="mpesaNumber" value={formData.mpesaNumber} onChange={handleInputChange} className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md py-2" placeholder="e.g., 254712345678" required={paymentMethod === 'mpesa'} />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        You will receive a prompt on your phone to complete the
                        payment.
                      </p>
                    </div>}
                  {paymentMethod === 'card' && <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card number
                        </label>
                        <div className="mt-1">
                          <input type="text" name="cardNumber" id="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3" required={paymentMethod === 'card'} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                            Expiration date
                          </label>
                          <div className="mt-1">
                            <input type="text" name="cardExpiry" id="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM / YY" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3" required={paymentMethod === 'card'} />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                            CVC
                          </label>
                          <div className="mt-1">
                            <input type="text" name="cardCvc" id="cardCvc" value={formData.cardCvc} onChange={handleInputChange} placeholder="123" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3" required={paymentMethod === 'card'} />
                          </div>
                        </div>
                      </div>
                    </div>}
                </div>
                <div className="mt-8 flex items-center">
                  <LockIcon className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </p>
                </div>
                <div className="mt-8">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70">
                    {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>;
}