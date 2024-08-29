import { useContext, useState } from "react";
import userContext from "../context/userContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AddBooking({ listing, deviceWidth }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectBookings, setRedirectBookings] = useState(false);
  let width = "";
  if (deviceWidth <= 1024) {
    width = "w-full";
  } else width = `max-w-[${deviceWidth / 5}px]`;
  const { user } = useContext(userContext);
  const data = {
    checkIn,
    checkOut,
    guests,
    user: user?._id,
    place: listing._id,
  };

  const handleBooking = async () => {
    if (!user) {
      setRedirect(true);
    }
    if (user) {
      const response = await axios.post("/booking", data);
      setRedirectBookings(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirectBookings) {
    return <Navigate to={"/account/bookings"} />;
  }
  return (
    <div
      className={`p-4 max-h-[550px] ${width} shadow-2xl border-2 border-gray-200 flex flex-col gap-4 rounded-xl`}
    >
      <span className="self-center">
        <span className="text-rose-500 font-bold text-xl">Price/Night:</span>{" "}
        {listing.price.toLocaleString()}
      </span>
      <label className="border-2 border-gray-800 p-4 rounded-lg">
        <span className="font-bold">Check In:</span>&nbsp;
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-rose-200 p-2 rounded-md"
        />
      </label>
      <label className="border-2 border-gray-800 p-4 rounded-lg">
        <span className="font-bold">Check Out:</span>&nbsp;
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-rose-200 p-2 rounded-md"
        />
      </label>
      <label className="border-2 border-gray-800 p-4 rounded-lg">
        <span className="font-bold">Number of Guests:</span>&nbsp;
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min={1}
          className="w-24 border-2 border-gray-500 p-2 rounded-md"
        />
      </label>
      <button
        onClick={handleBooking}
        className="bg-rose-400 text-white font-bold p-4 rounded-full mt-4"
      >
        Book This Place
      </button>
    </div>
  );
}

export default AddBooking;
