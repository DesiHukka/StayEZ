import { Link, useParams } from "react-router-dom";

import AddPlaces from "./AddPlaces";
import axios from "axios";
import PlaceList from "./PlaceList";
import { useEffect, useState } from "react";

function Places() {
  const [ready, setReady] = useState(false);
  const [placeDetails, setPlaceDetails] = useState([]);
  const [place, setPlace] = useState("");
  const { id } = useParams();
  console.log(ready);

  const getPlaces = async () => {
    const { data } = await axios.get("/account/places", {
      withCredentials: true,
    });
    console.log(data);
    setPlaceDetails([...data]);
  };

  useEffect(() => {
    if (!id) {
      getPlaces().then(() => setReady(true));
    }
  }, [id]);

  useEffect(() => {
    if (id && id !== "new") {
      getPlaceById();
    }
  }, [id]);

  const getPlaceById = async () => {
    const { data: place } = await axios.get(`/place/${id}`);
    setPlace(place);
  };

  if (id !== "new" && ready) {
    return (
      <div className="flex flex-col items-center m-4 ">
        <Link to={"/account/places/new"}>
          <span className="bg-teal-400 px-4 py-2 rounded-xl text-white font-semibold">
            Add New
          </span>
        </Link>
        <PlaceList placeDetails={placeDetails} />
      </div>
    );
  } else if (id !== "new" && !place) {
    return "Loading Places...";
  } else if (id) {
    console.log(id);
    return (
      <AddPlaces
        place={place}
        setReady={setReady}
        setPlaceDetails={setPlaceDetails}
      />
    );
  }
}

export default Places;
