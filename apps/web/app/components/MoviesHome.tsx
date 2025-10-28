"use client";

import { useState } from "react";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import BookingConfirm from "./BookingConfirm";

export default function MoviesHome() {
  const [view, setView] = useState<"list" | "details" | "confirm">("list");
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [bookingInfo, setBookingInfo] = useState<any>(null);

  if (view === "confirm")
    return <BookingConfirm info={bookingInfo} onBack={() => setView("list")} />;

  if (view === "details" && selectedMovie)
    return (
      <MovieDetails
        movie={selectedMovie}
        onBack={() => setView("list")}
        onBook={(info) => {
          setBookingInfo(info);
          setView("confirm");
        }}
      />
    );

  return (
    <MovieList
      onSelect={(movie) => {
        setSelectedMovie(movie);
        setView("details");
      }}
    />
  );
}
