import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import userContext from "../../../context/userContext";
import { Link } from "react-router-dom";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getBookings();
  }, []);
  const { user } = useContext(userContext);
  const getBookings = async () => {
    const { data } = await axios.post("/my-bookings", user);
    setBookings([...data]);
  };

  if (bookings.length === 0) {
    return "No Bookings Found";
  }
  return (
    <div className="mt-6 w-3/4 flex flex-col items-center gap-4 mx-auto">
      {bookings.length > 0 &&
        bookings.map((booking) => {
          const { place } = booking;
          const { photos } = place;

          return (
            <div className="flex flex-col md:w-3/5 md:flex-row gap-2 bg-slate-200 p-4 rounded-lg">
              <div className="w-full md:w-2/5 xl:w-1/5 overflow-hidden">
                <img
                  src={`https://stay-ez-rqol.vercel.app/uploads/${photos[0]}`}
                  className="object-cover aspect-square"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm lg:text-lg">
                <span className="font-semibold line-clamp-1 md:line-clamp-2">
                  {place.title}
                </span>
                <span className="text-xs">
                  Your Check In Date: {booking.checkIn}
                </span>
                <span className="text-xs">
                  Your Check Out Date: {booking.checkOut}
                </span>
                <span className="text-xs">
                  Booked for {booking.guests}{" "}
                  {booking.guests > 1 ? "People" : "Person"}
                </span>
                <Link
                  className="text-xs cursor-pointer bg-rose-400 rounded-xl text-white w-1/2 p-2"
                  to={`/listing/${place._id}`}
                >
                  Go to Listing
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Bookings;
