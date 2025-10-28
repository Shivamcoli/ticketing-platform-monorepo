'use client';
import { useState } from 'react';
import { API_BASE_URL } from '../lib/api';

export default function InfoComponent({
  event,
  onConfirm,
}: {
  event: any;
  onConfirm: (b: any) => void;
}) {
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // ✅ Added
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);

  const handleBook = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const availableSeats =
      remainingSeats ?? (event.totalTickets - event.bookedTickets);

    // ✅ Prevent overbooking from frontend
    if (quantity > availableSeats) {
      setError(`Only ${availableSeats} tickets left.`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          userEmail: email,
          quantity,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');

      // ✅ Update event pricing & remaining seats locally
      if (data.newPrice) {
        event.currentPrice = data.newPrice;
      }

      if (data.remainingSeats !== undefined) {
        event.bookedTickets = event.totalTickets - data.remainingSeats;
        setRemainingSeats(data.remainingSeats);
      }

      setSuccess(`✅ Booking successful! ${data.remainingSeats} seats left.`);

      // ✅ Notify parent (optional)
      onConfirm?.(data.booking);
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Compute available seats (initially from event)
  const availableSeats =
    remainingSeats ?? (event.totalTickets - event.bookedTickets);

  return (
    <div className="p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
      <p className="text-gray-600">{event.description}</p>

      <p className="text-blue-700 font-medium mt-3">
        💰 ₹{event.currentPrice} per ticket
      </p>

      <p className="text-green-700 font-medium mt-1">
        🎟️ Available Seats: {availableSeats}
      </p>

      <div className="mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="number"
          placeholder="Quantity"
          min={1}
          value={quantity || ''} // ✅ avoids showing 0
          onChange={(e) => {
            const val = Number(e.target.value);
            setQuantity(val > 0 ? val : 1);
          }}
          className="border p-2 w-full mb-4 rounded"
        />

        <button
          disabled={loading || !email || quantity < 1}
          onClick={handleBook}
          className={`${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-4 py-2 rounded w-full transition`}
        >
          {loading ? 'Booking...' : 'Book Tickets'}
        </button>

        {/* ✅ Display feedback clearly */}
        {error && (
          <p className="text-red-600 mt-3 font-medium text-sm">{error}</p>
        )}
        {success && (
          <p className="text-green-600 mt-3 font-medium">{success}</p>
        )}
      </div>
    </div>
  );
}
