export default function ConfirmationComponent({ booking }: { booking: any }) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-2">✅ Booking Confirmed!</h1>
      <p>Booking ID: {booking.id}</p>
      <p>Tickets: {booking.quantity}</p>
      <p>Total Paid: ₹{booking.pricePaid}</p>
      <p className="mt-4 text-gray-600">
        Thank you for booking with us!
      </p>
    </div>
  );
}
