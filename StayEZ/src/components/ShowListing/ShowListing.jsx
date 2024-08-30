import { MdOutlineWifi } from "react-icons/md";
import { MdSoupKitchen } from "react-icons/md";
import { MdOutlineLocalDining } from "react-icons/md";
import { BiSolidCctv } from "react-icons/bi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";
import { GiWashingMachine } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";
import { RiGalleryView2 } from "react-icons/ri";
import { MdCloseFullscreen } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddBooking from "../AddBooking";

function ShowListing({ listing }) {
  const [showMorePhotos, setShowMorePhotos] = useState(false);
  const { photos } = listing;
  const { perks } = listing;
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setDeviceWidth(window.innerWidth);
  });
  console.log(deviceWidth);
  if (!photos) {
    return "loading...";
  }

  if (showMorePhotos) {
    return (
      <div className="flex flex-col items-center gap-4 my-4">
        <button
          onClick={() => setShowMorePhotos(false)}
          className="fixed top-32 right-20 flex gap-2 items-center rounded-lg px-4 py-2 bg-rose-400 text-white font-extrabold"
        >
          <span>Close Gallery</span>
          <span className="text-2xl ">
            <MdCloseFullscreen />
          </span>
        </button>
        {photos.map((photo) => {
          return (
            <div className="w-1/2 rounded-lg overflow-hidden">
              <Link to={`https://stay-ez-rqol.vercel.app/uploads/${photo}`}>
                <img
                  className="object-cover aspect-square"
                  src={`https://stay-ez-rqol.vercel.app/uploads/${photo}`}
                  alt=""
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex gap-2 p-8">
      <div className="lg:w-3/5 w-4/5 flex flex-col gap-8 mx-auto">
        <div className="font-semibold text-3xl">{listing.title}</div>
        <div
          onClick={() => setShowMorePhotos(true)}
          className="relative rounded-xl mx-auto grid grid-cols-3 lg:grid-cols-4 grid-rows-2 lg:gap-2 gap-1 place-items-center place-content-center overflow-hidden"
        >
          {photos.map((photo, idx) => {
            if (idx === 0) {
              return (
                <div className="col-span-2 row-span-2 cursor-pointer overflow-hidden">
                  <img
                    src={`https://stay-ez-rqol.vercel.app/uploads/${photo}`}
                    className="object-cover aspect-square hover:scale-105 ease-in duration-300"
                  />
                </div>
              );
            } else if (
              deviceWidth > 768 &&
              (idx === 1 || idx === 2 || idx === 3 || idx === 4)
            ) {
              return (
                <div className="cursor-pointer overflow-hidden">
                  <img
                    src={`https://stay-ez-rqol.vercel.app/uploads/${photo}`}
                    className="object-cover aspect-square hover:scale-105 ease-in duration-300"
                  />
                </div>
              );
            } else if (deviceWidth <= 768 && (idx === 1 || idx === 2)) {
              return (
                <div className="cursor-pointer overflow-hidden">
                  <img
                    src={`https://stay-ez-rqol.vercel.app/uploads/${photo}`}
                    className="object-cover aspect-square hover:scale-105 ease-in duration-300"
                  />
                </div>
              );
            } else return;
          })}
          <button
            onClick={() => setShowMorePhotos(true)}
            className="flex items-center gap-1 absolute bottom-2 right-2 bg-white px-4 py-2 rounded-lg bg-opacity-80 hover:bg-opacity-100"
          >
            <span className="text-lg">
              <RiGalleryView2 />
            </span>
            {deviceWidth > 768 && <span>Show More</span>}
          </button>
        </div>
        <div className="font-semibold text-lg self-start">
          <div>Located in {listing.address}</div>
          <span className="text-sm font-normal">
            <span className="text-rose-500 font-medium">Max Capacity</span>:{" "}
            {listing.maxGuests} guests
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold my-4">
            What This Place Offers:
          </h2>
          <div className="grid sm:grid-cols-2 grid-cols-1 place-items-start">
            {perks.map((perk) => {
              if (perk === "wifi") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <MdOutlineWifi />
                    <span>Wifi</span>
                  </div>
                );
              } else if (perk === "kitchen") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <MdSoupKitchen />
                    <span>Kitchen</span>
                  </div>
                );
              } else if (perk === "dining area") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <MdOutlineLocalDining />
                    <span>Dining Area</span>
                  </div>
                );
              } else if (perk === "security camera") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <BiSolidCctv />
                    <span>Security Cameras</span>
                  </div>
                );
              } else if (perk === "smoke alarm") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <RiAlarmWarningFill />
                    <span>Smoke Alarm</span>
                  </div>
                );
              } else if (perk === "air conditioning") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <TbAirConditioning />
                    <span>Air Conditioning</span>
                  </div>
                );
              } else if (perk === "free parking") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <LuParkingCircle />
                    <span>Free Parking</span>
                  </div>
                );
              } else if (perk === "washing machine") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <GiWashingMachine />
                    <span>Washing Machine</span>
                  </div>
                );
              } else if (perk === "tv") {
                return (
                  <div className="flex gap-4 justify-center items-center text-2xl">
                    <PiTelevisionFill />
                    <span>TV</span>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {deviceWidth <= 1024 && (
          <AddBooking listing={listing} deviceWidth={deviceWidth} />
        )}
        <div className="flex gap-4 ">
          <div className="flex flex-col gap-4 justify-center">
            <h2 className="text-2xl font-semibold">About This Place:</h2>
            <pre className="text-gray-600 whitespace-pre-wrap">
              {listing.description}
            </pre>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <h2 className="text-2xl font-semibold">Extra Info:</h2>
          <pre className=" text-gray-600 mb-4 whitespace-pre-wrap">
            {listing.extraInfo}
          </pre>
        </div>
      </div>
      {deviceWidth > 1024 && (
        <div className="mt-16">
          <div className="sticky top-16">
            <AddBooking listing={listing} deviceWidth={deviceWidth} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowListing;
