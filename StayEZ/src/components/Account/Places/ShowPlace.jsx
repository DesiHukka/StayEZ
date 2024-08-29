import { Link, Navigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

function ShowPlace({ place }) {
  const handleEditClick = () => {
    setEdit(true);
  };

  return (
    <div className="flex gap-2 md:gap-4 bg-slate-200 w-full lg:w-3/5 lg:mx-auto p-1 md:p-4 rounded-lg">
      <div className="bg-gray-500 w-28 min-h-20 max-h-64 xs:w-2/5 overflow-hidden rounded-lg">
        <img
          className="object-cover aspect-square"
          src={`http://localhost:8080/uploads/${place.photos[0]}`}
        />
      </div>
      <div className="flex flex-col w-3/5 gap-2 md:gap-4 justify-center">
        <div className="font-bold text-center md:text-3xl line-clamp-1 ">
          {place.title}
        </div>
        <div className="text-gray-500 text-sm text-pretty font-medium line-clamp-2 xs:line-clamp-4">
          {place.description}
        </div>
        <Link to={`/account/places/${place._id}`} onClick={handleEditClick}>
          <span className="flex xs:w-3/5 xs:mx-auto justify-center items-center gap-2 bg-rose-500 rounded-lg xs:p-2 text-white font-bold xs:font-semibold text-lg xs:text-2xl mt-2">
            <FaRegEdit />
            <span className="text-lg xs:text-xl">Edit</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ShowPlace;
