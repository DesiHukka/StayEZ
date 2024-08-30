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
      {subpage === "profile" && (
        <div className="p-4 bg-slate-300">
          <div className="flex flex-col gap-4 w-3/4 md:w-3/5 text-lg">
            <h2 className="font-semibold">
              Hi,{" "}
              <span className="font-semibold text-rose-500">{user.name}</span>
            </h2>
            <p className="text-balance">
              You can check your bookings by clicking on the "My Bookings" tab
              above.
            </p>
            <p className="text-balance">
              If you want to list your own place, then Click on "My Places" tab.
              There you will find "Add New" Button. Clicking it will open a form
              regarding the details of your place. Just fill the form completely
              and upload atleast 5 images for better interaction with the
              customers.
            </p>
            <p className="text-balance">
              Moreover, "My Places" tab will also list your all places, so you
              can easily keep watch on your listed places.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
