import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EventCard } from '../components/EventCard';
import { EventFilter } from '../components/EventFilter';
import { ListIcon, GridIcon } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

interface FilterValues {
  date: string;
  category: string;
  priceRange: [number, number];
  location: string;
}

export function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    date: '',
    category: '',
    priceRange: [0, 1000],
    location: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setAllEvents(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filteredEvents = [...allEvents];
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(term) || event.location.toLowerCase().includes(term) || event.category.toLowerCase().includes(term));
    }
    // Apply category filter
    if (activeFilters.category) {
      filteredEvents = filteredEvents.filter(event => event.category === activeFilters.category);
    }
    // Apply date filter
    if (activeFilters.date) {
      // In a real app, you would convert both dates to comparable formats
      // This is a simplified example
      filteredEvents = filteredEvents.filter(event => event.date.includes(activeFilters.date));
    }
    // Apply location filter
    if (activeFilters.location) {
      filteredEvents = filteredEvents.filter(event => event.location.includes(activeFilters.location));
    }
    // Apply price range filter
    filteredEvents = filteredEvents.filter(event => event.price >= activeFilters.priceRange[0] && event.price <= activeFilters.priceRange[1]);
    setEvents(filteredEvents);
  }, [searchTerm, activeFilters, allEvents]);
  const handleFilterChange = (filters: FilterValues) => {
    setActiveFilters(filters);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="relative flex-grow max-w-xs mr-4">
            <input type="text" placeholder="Search events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="flex border border-gray-300 rounded-md">
            <button onClick={() => setIsGridView(true)} className={`p-2 ${isGridView ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'}`} aria-label="Grid view">
              <GridIcon className="h-5 w-5" />
            </button>
            <button onClick={() => setIsGridView(false)} className={`p-2 ${!isGridView ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500'}`} aria-label="List view">
              <ListIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <EventFilter onFilterChange={handleFilterChange} />
      </div>
      {events.length === 0 ? <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No events match your search criteria.
          </p>
          <button onClick={() => {
        setSearchTerm('');
        setActiveFilters({
          date: '',
          category: '',
          priceRange: [0, 1000],
          location: ''
        });
      }} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Clear Filters
          </button>
        </div> : <>
          <p className="mt-4 text-gray-600">{events.length} events found</p>
          {isGridView ? <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map(event => <EventCard key={event.id} id={event.id} title={event.title} date={event.date} location={event.location} image={event.image} category={event.category} price={event.price} />)}
            </div> : <div className="mt-6 space-y-4">
              {events.map(event => <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/4">
                      <img src={event.image} alt={event.title} className="w-full h-48 md:h-full object-cover" />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="mr-4">{event.date}</span>
                            <span>{event.location}</span>
                          </div>
                          <p className="mt-3 text-gray-600">
                            {event.description}
                          </p>
                          <div className="mt-4">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              {event.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-indigo-600">
                            ${event.price.toFixed(2)}
                          </p>
                          <a href={`/events/${event.id}`} className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>}
        </>}
    </div>;
}