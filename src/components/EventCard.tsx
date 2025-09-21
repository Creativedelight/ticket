import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: number;
}
export function EventCard({
  id,
  title,
  date,
  location,
  image,
  category,
  price
}: EventCardProps) {
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/events/${id}`}>
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="truncate">{location}</span>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-indigo-600 font-semibold">
              ${price.toFixed(2)}
            </span>
            <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>;
}