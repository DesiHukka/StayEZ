import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import axios from "axios";
import Listing from "../Listing/Listing";
import { useParams } from "react-router-dom";
import SinglePage from "../ShowListing/ShowListing";

function Home() {
  const { user, ready } = useContext(userContext);
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState({});
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

  if (!ready) {
    return "loading...";
  }
  const places = listings.map((listing) => {
    return <Listing details={listing} />;
  });
  if (id) {
    return <SinglePage listing={listing} />;
  }

  return (
    <div className="flex gap-4 w-3/4 mx-auto flex-wrap my-4">{places}</div>
  );
}

export default Home;
