"use client";
import { useState } from "react";

const seats = Array.from({ length: 30 }, (_, i) => i + 1);

export default function MovieDetails({
  movie,
  onBack,
  onBook,
}: {
  movie: any;
  onBack: () => void;
  onBook: (info: any) => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSeat = (seat: number) => {
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button onClick={onBack} className="text-indigo-600 underline mb-4">
        ← Back to Movies
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-500 mb-3">{movie.genre}</p>
        <p className="font-semibold text-lg">₹{movie.price} per seat</p>

        <h2 className="text-xl font-bold mt-8 mb-3">Select Seats</h2>
        <div className="grid grid-cols-6 gap-2 justify-center">
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`p-3 rounded-md text-sm font-medium ${
                selected.includes(seat)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {seat}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="mb-2 font-semibold">
            Seats: {selected.length} | Total: ₹{selected.length * movie.price}
          </p>
          <button
            onClick={() =>
              onBook({
                movie,
                seats: selected,
                total: selected.length * movie.price,
              })
            }
            disabled={selected.length === 0}
            className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
