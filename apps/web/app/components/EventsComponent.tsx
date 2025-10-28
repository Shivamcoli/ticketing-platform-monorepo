'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../lib/api';

export default function EventsComponent({ onSelect }: { onSelect: (event: any) => void }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("❌ Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Events</h1>
      <div className="grid grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg p-4 hover:shadow-lg cursor-pointer"
            onClick={() => onSelect(event)}
          >
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p>{event.venue}</p>
            <p className="text-gray-500 text-sm">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-blue-600 font-medium">₹{event.currentPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
