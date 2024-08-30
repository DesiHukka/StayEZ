import { MdOutlineTravelExplore } from "react-icons/md";
import { BsSearchHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { useContext, useState, useEffect } from "react";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
function Header() {
  // Destination will contain address array for Search functionality.
  const [destinations, setDestinations] = useState([]);
  const { user } = useContext(userContext);
  let places;
  useEffect(() => {
    const getListings = async () => {
      const { data } = await axios.get("/");
      places = data;
    };
    getListings();
  }, []);

  const addresses = places?.map((place) => place.address);
  if (addresses) {
    setDestinations([...addresses]);
  }

  return (
    <header className="flex justify-around my-2 border-b-4 p-2 ">
      <Link to={"/"}>
        <div className="md:flex gap-2 items-center hidden">
          <MdOutlineTravelExplore className="text-rose-600 text-3xl" />
          <span className="font-bold text-rose-500 text-lg">StayEZ</span>
        </div>
      </Link>
      <div className="border-2 sm:border-gray-300 border-rose-400 px-4 py-2 rounded-full sm:shadow-sm shadow-md shadow-rose-400">
        <div className="bg-white">
          <ul>
            {destinations.map((destination) => (
              <li>{destination}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={user ? "/account" : "/login"}
        className="hidden xs:flex gap-2 items-center text-lg border-2 px-4 rounded-full text-gray-600"
      >
        <GiHamburgerMenu />
        <FaCircleUser className="text-2xl hidden sm:inline" />
        {user?.name}
      </Link>
    </header>
  );
}

export default Header;
