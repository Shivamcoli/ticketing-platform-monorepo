export default function BookingConfirm({
  info,
  onBack,
}: {
  info: any;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Movie: <span className="font-semibold">{info.movie.title}</span>
        </p>
        <p className="text-gray-600 mb-2">Seats: {info.seats.join(", ")}</p>
        <p className="text-gray-700 mb-4 font-medium">
          Total Paid: ₹{info.total}
        </p>
        <button
          onClick={onBack}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Movies
        </button>
      </div>
    </div>
  );
}
