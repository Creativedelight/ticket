import React, { useState } from 'react';
import { CalendarIcon, FilterIcon } from 'lucide-react';
interface EventFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}
interface FilterValues {
  date: string;
  category: string;
  priceRange: [number, number];
  location: string;
}
export function EventFilter({
  onFilterChange
}: EventFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    date: '',
    category: '',
    priceRange: [0, 1000],
    location: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    let newFilters = {
      ...filters
    };
    if (name === 'minPrice' || name === 'maxPrice') {
      const priceRange = [...filters.priceRange] as [number, number];
      if (name === 'minPrice') {
        priceRange[0] = Number(value);
      } else {
        priceRange[1] = Number(value);
      }
      newFilters.priceRange = priceRange;
    } else {
      newFilters = {
        ...filters,
        [name]: value
      };
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const categories = ['All Categories', 'Music', 'Sports', 'Theatre', 'Comedy', 'Conference', 'Workshop', 'Exhibition'];
  const locations = ['All Locations', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'Austin', 'San Francisco'];
  return <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FilterIcon className="h-5 w-5 mr-2" />
          Filter Events
        </h3>
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-indigo-600 text-sm font-medium">
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ${isExpanded ? '' : 'hidden md:grid'}`}>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <input type="date" name="date" id="date" value={filters.date} onChange={handleFilterChange} className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select id="category" name="category" value={filters.category} onChange={handleFilterChange} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            {categories.map(category => <option key={category} value={category === 'All Categories' ? '' : category}>
                {category}
              </option>)}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select id="location" name="location" value={filters.location} onChange={handleFilterChange} className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            {locations.map(location => <option key={location} value={location === 'All Locations' ? '' : location}>
                {location}
              </option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input type="number" name="minPrice" placeholder="Min" value={filters.priceRange[0]} onChange={handleFilterChange} className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            <span className="text-gray-500">-</span>
            <input type="number" name="maxPrice" placeholder="Max" value={filters.priceRange[1]} onChange={handleFilterChange} className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
      </div>
      {isExpanded && <div className="mt-4 flex justify-end">
          <button onClick={() => {
        setFilters({
          date: '',
          category: '',
          priceRange: [0, 1000],
          location: ''
        });
        onFilterChange({
          date: '',
          category: '',
          priceRange: [0, 1000],
          location: ''
        });
      }} className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Clear All
          </button>
          <button onClick={() => onFilterChange(filters)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Apply Filters
          </button>
        </div>}
    </div>;
}