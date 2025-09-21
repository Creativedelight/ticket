// src/components/EventsSection.tsx
import { useEffect, useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  seats_available: number;
}

export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/events") // 🔹 later replace with your backend URL
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  return (
    <section className="py-10 px-5 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-center">No events available</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{event.name}</h3>
              <p className="text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Seats left: {event.seats_available}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
