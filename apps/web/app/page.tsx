'use client';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from './lib/api';
import InfoComponent from './components/InfoComponent';

export default function HomePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch events from backend
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // 🔹 If booking done, show confirmation
  if (booking) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-green-700">
          ✅ Booking Confirmed!
        </h2>
        <p className="mt-2">Email: {booking.userEmail}</p>
        <p>Quantity: {booking.quantity}</p>
        <p>Total Paid: ₹{booking.pricePaid}</p>
        <button
          onClick={() => {
            setBooking(null);
            setSelectedEvent(null);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Events
        </button>
      </div>
    );
  }

  // 🔹 If event selected, show info/booking form
  if (selectedEvent) {
    return (
      <InfoComponent event={selectedEvent} onConfirm={(b) => setBooking(b)} />
    );
  }

  // 🔹 Default view: show all events
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Events</h1>

      {loading && <p className="text-center">Loading events...</p>}

      {!loading && events.length === 0 && (
        <p className="text-center text-gray-600">No events available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => setSelectedEvent(e)}
          >
            <h2 className="text-lg font-semibold">{e.name}</h2>
            <p className="text-gray-600">{e.venue}</p>
            <p className="text-gray-500">
              {new Date(e.date).toLocaleDateString()}
            </p>
            <p className="text-blue-700 font-medium mt-2">
              ₹{e.currentPrice} per ticket
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
