import React from "react";
import { Link } from "react-router-dom";

function Listing({ details }) {
  return (
    <Link to={`/listing/${details._id}`}>
      <div className="flex flex-col">
        <div className="max-w-64 max-h-64 overflow-hidden rounded-lg">
          <img
            src={`https://stayez.onrender.com/uploads/${details.photos[0]}`}
            className="object-cover aspect-square hover:scale-105 ease-in-out duration-300 "
          />
        </div>
        <div className="max-w-64">
          <div className="line-clamp-1 font-semibold">{details.address}</div>
          <div className="line-clamp-2 text-gray-500">
            {details.description}
          </div>
          <div className="font-medium">
            &#x20b9;{details.price.toLocaleString()}/Night
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Listing;
