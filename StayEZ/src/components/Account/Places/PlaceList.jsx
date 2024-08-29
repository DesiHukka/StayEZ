import React from "react";
import ShowPlace from "./ShowPlace";

function PlaceList({ placeDetails }) {
  const userPlaces = placeDetails.map((place) => <ShowPlace place={place} />);
  return <div className="p-4 flex flex-col gap-4">{userPlaces}</div>;
}

export default PlaceList;
