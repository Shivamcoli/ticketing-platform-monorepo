const movies = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi / Adventure", price: 320 },
  { id: 2, title: "The Batman", genre: "Action / Thriller", price: 280 },
  { id: 3, title: "Oppenheimer", genre: "Biography / Drama", price: 350 },
];

export default function MovieList({ onSelect }: { onSelect: (m: any) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎥 Now Showing</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onSelect(movie)}
            className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-lg border transition"
          >
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-500">{movie.genre}</p>
            <p className="font-medium mt-2 text-indigo-600">₹{movie.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
