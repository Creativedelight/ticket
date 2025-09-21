import React, { useState } from 'react';
interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'VVIP' | 'VIP' | 'Regular';
  price: number;
  isAvailable: boolean;
}
interface SeatMapProps {
  seats: Seat[];
  onSeatSelect: (selectedSeats: Seat[]) => void;
}
export function SeatMap({
  seats,
  onSeatSelect
}: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
  const handleSeatClick = (seat: Seat) => {
    if (!seat.isAvailable) return;
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    let newSelectedSeats: Seat[];
    if (isSelected) {
      newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    } else {
      newSelectedSeats = [...selectedSeats, seat];
    }
    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };
  const getSeatColor = (seat: Seat) => {
    if (!seat.isAvailable) return 'bg-gray-300';
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) return 'bg-green-500';
    switch (seat.category) {
      case 'VVIP':
        return 'bg-purple-200 hover:bg-purple-300';
      case 'VIP':
        return 'bg-blue-200 hover:bg-blue-300';
      case 'Regular':
        return 'bg-indigo-200 hover:bg-indigo-300';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };
  return <div className="mt-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select Your Seats
        </h3>
        <div className="flex justify-center space-x-6 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">VVIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">VIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Regular</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Unavailable</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Selected</span>
          </div>
        </div>
        <div className="w-full bg-gray-800 h-6 rounded-t-lg flex items-center justify-center">
          <span className="text-white text-sm">STAGE</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {Object.entries(seatsByRow).map(([row, rowSeats]) => <div key={row} className="flex justify-center mb-2">
              <div className="w-8 flex items-center justify-center font-semibold text-gray-700">
                {row}
              </div>
              <div className="flex space-x-1">
                {rowSeats.map(seat => <button key={seat.id} onClick={() => handleSeatClick(seat)} disabled={!seat.isAvailable} className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors ${getSeatColor(seat)} ${seat.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`} title={`${row}${seat.number} - ${seat.category} - $${seat.price}`}>
                    {seat.number}
                  </button>)}
              </div>
            </div>)}
        </div>
      </div>
      {selectedSeats.length > 0 && <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="font-medium text-gray-900">Selected Seats:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSeats.map(seat => <div key={seat.id} className="px-2 py-1 bg-green-100 rounded text-sm">
                {seat.row}
                {seat.number} - {seat.category} (${seat.price})
              </div>)}
          </div>
          <div className="mt-2 font-medium text-gray-900">
            Total: $
            {selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toFixed(2)}
          </div>
        </div>}
    </div>;
}