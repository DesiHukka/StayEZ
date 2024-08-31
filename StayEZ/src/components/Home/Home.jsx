import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import axios from "axios";
import Listing from "../Listing/Listing";
import { useParams } from "react-router-dom";
import SinglePage from "../ShowListing/ShowListing";
import { MdOutlineWifi } from "react-icons/md";
import { MdSoupKitchen } from "react-icons/md";
import { MdOutlineLocalDining } from "react-icons/md";
import { BiSolidCctv } from "react-icons/bi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";
import { GiWashingMachine } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";

function Home() {
  const { user, ready } = useContext(userContext);
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState({});
  const [perks, setPerks] = useState([]);
  const [filteredResult, setFilteredResult] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const getListings = async () => {
      const { data } = await axios.get("/");
      setListings([...data]);
    };
    getListings();
  }, []);

  useEffect(() => {
    if (id) {
      getListing();
    }
  }, [id]);

  const getListing = async () => {
    const { data } = await axios.get(`/listing/${id}`);
    setListing({ ...data });
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setPerks([...perks, e.target.name]);
      setFilteredResult(true);
    } else {
      setPerks([...perks.filter((name) => name !== e.target.name)]);
    }
  };

  if (!ready) {
    return "loading...";
  }

  // let isSubset = !data2.some((string) => data1.indexOf(string) == -1);
  // listings.map((listing) => {
  //   let isSubset = !perks.some((perk) => listing.perks.indexOf(perk) == -1);
  //   if (isSubset) {
  //     return <Listing details={listing} />;
  //   }
  // });

  const places = listings.map((listing) => {
    if (filteredResult) {
      let isSubset = !perks.some((perk) => listing.perks.indexOf(perk) == -1);
      if (isSubset) {
        console.log(listing);
        return <Listing details={listing} />;
      }
    }
    if (!filteredResult) {
      return <Listing details={listing} />;
    }
  });
  if (id) {
    return <SinglePage listing={listing} />;
  }

  const sliderLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 300;
  };
  const sliderRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 300;
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-4 justify-center items-center">
        <FaCircleChevronLeft
          onClick={sliderLeft}
          className="text-2xl text-gray-300 hover:text-gray-800 hover:cursor-pointer"
        />
        <div
          id="slider"
          className="flex xl:gap-8 sm:gap-4 overflow-x-auto whitespace-nowrap scroll-smooth h-16 scrollbar-hide w-3/5 "
        >
          <label
            className={`flex flex-col items-center gap-2 text-gray-600 hover:cursor-pointer ${
              perks.includes("kitchen") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="kitchen"
              onChange={handleCheckBox}
              className="hidden"
            />
            <MdSoupKitchen className="text-3xl" />
            <span className="text-xs">Kitchen</span>
          </label>
          <label
            className={`flex flex-col items-center gap-2 text-gray-600 hover:cursor-pointer ${
              perks.includes("dining area") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="dining area"
              onChange={handleCheckBox}
              className="hidden"
            />
            <MdOutlineLocalDining className="text-3xl" />
            <span className="text-xs">Dining Area</span>
          </label>
          <label
            className={`flex flex-col items-center gap-2 hover:cursor-pointer text-gray-600 ${
              perks.includes("wifi") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="wifi"
              onChange={handleCheckBox}
              className="hidden"
            />
            <MdOutlineWifi className="text-3xl" />
            <span className="text-xs">Wifi</span>
          </label>
          <label
            className={`flex flex-col items-center gap-2 hover:cursor-pointer text-gray-600 ${
              perks.includes("security camera") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="security camera"
              onChange={handleCheckBox}
              className="hidden"
            />
            <BiSolidCctv className="text-3xl" />
            <span className="text-xs">Security Camera</span>
          </label>
          <label
            className={`flex flex-col hover:cursor-pointer items-center gap-2 text-gray-600 ${
              perks.includes("smoke alarm") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="smoke alarm"
              onChange={handleCheckBox}
              className="hidden"
            />
            <RiAlarmWarningFill className="text-3xl" />
            <span className="text-xs">Smoke Alarm</span>
          </label>
          <label
            className={`flex flex-col hover:cursor-pointer items-center gap-2 text-gray-600 ${
              perks.includes("air conditioning") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="air conditioning"
              onChange={handleCheckBox}
              className="hidden"
            />
            <TbAirConditioning className="text-3xl" />
            <span className="text-xs">AC</span>
          </label>
          <label
            className={`flex flex-col hover:cursor-pointer items-center gap-2 text-gray-600 ${
              perks.includes("free parking") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="free parking"
              onChange={handleCheckBox}
              className="hidden"
            />
            <LuParkingCircle className="text-3xl" />
            <span className="text-xs">Free Parking</span>
          </label>
          <label
            className={`flex flex-col hover:cursor-pointer items-center gap-2 text-gray-600 ${
              perks.includes("tv") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="tv"
              onChange={handleCheckBox}
              className="hidden"
            />
            <PiTelevisionFill className="text-3xl" />
            <span className="text-xs">TV</span>
          </label>
          <label
            className={`flex flex-col hover:cursor-pointer items-center gap-2 text-gray-600 ${
              perks.includes("washing machine") && "text-rose-500"
            }`}
          >
            <input
              type="checkbox"
              name="washing machine"
              onChange={handleCheckBox}
              className="hidden"
            />
            <GiWashingMachine className="text-3xl" />
            <span className="text-xs">Washing Machine</span>
          </label>
        </div>
        <FaCircleChevronRight
          onClick={sliderRight}
          className="text-2xl text-gray-300 hover:text-gray-800 hover:cursor-pointer"
        />
      </div>

      <div className="flex gap-6 w-3/4 justify-center mx-auto flex-wrap my-4">
        {places}
      </div>
    </div>
  );
}

export default Home;
