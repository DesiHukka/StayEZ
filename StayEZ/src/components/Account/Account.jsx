import { useContext, useState } from "react";
import userContext from "../../context/userContext";
import { Navigate, Link, useParams } from "react-router-dom";
import Places from "./Places/Places";
import AddPlaces from "./Places/AddPlaces";
import Bookings from "./Bookings/Bookings";

function Account() {
  const { user, ready } = useContext(userContext);
  const { subpage = "profile" } = useParams();

  const linkClasses = (type = "profile") => {
    let classes =
      "px-2 py-1 text-sm text-center md:px-4 md:py-2 rounded-full text-white";
    console.log(classes);

    return type === subpage
      ? (classes += " bg-rose-500")
      : (classes += " bg-slate-400");
  };

  if (!ready) return "Loading...";
  if (ready && !user) return <Navigate to={"/login"} />;

  return (
    <div className="flex flex-col p-4 min-h-[600px] xl:min-h-[750px] gap-4">
      <nav className="flex gap-2 ml-16">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Places
        </Link>
      </nav>
      {subpage === "places" && <Places />}
      {subpage === "bookings" && <Bookings />}
    </div>
  );
}

export default Account;
