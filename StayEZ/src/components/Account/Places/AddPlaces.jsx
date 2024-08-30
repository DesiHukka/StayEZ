import PlacePerks from "../../PlacePerks/PlacePerks";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RiUploadCloudLine } from "react-icons/ri";
import { Link, Navigate, useParams } from "react-router-dom";
import userContext from "../../../context/userContext";
import { TiDelete } from "react-icons/ti";

function AddPlaces({ place, setReady, setPlaceDetails }) {
  console.log(place);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [addedPic, setAddedPic] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { user } = useContext(userContext);
  const { id } = useParams();

  useEffect(() => {
    if (id !== "new" && !id) {
      return;
    }
    if (id !== "new" && id) {
      setTitle(place.title);
      setAddress(place.address);
      setDescription(place.description);
      setPerks(place.perks);
      setExtraInfo(place.extraInfo);
      setCheckIn(place.checkIn);
      setCheckOut(place.checkOut);
      setMaxGuests(place.maxGuests);
      setImageLink(place.imageLink);
      setAddedPic(place.photos);
      setPrice(place.price);
    }
  }, [place]);

  const imageDownloader = async (e) => {
    e.preventDefault();
    const { data: imageName } = await axios.post("/upload-by-link", {
      imageLink,
    });
    setImageLink("");
    setAddedPic((prev) => [...prev, imageName]);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;

    const formData = new FormData();

    for (let file of files) {
      formData.append("imageUploads", file);
    }

    const { data: filesArray } = await axios.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    for (let file of filesArray) {
      const imageName = file.filename;
      setAddedPic((prev) => [...prev, imageName]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      const { data } = await axios.post("/account/places", {
        owner: user._id,
        title,
        description,
        extraInfo,
        perks,
        address,
        photos: addedPic,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });

      setRedirect(true);
      setReady(true);
      // window.location.pathname = "/account/places"; //important
    } else {
      const { data } = await axios.put("/account/places", {
        id,
        owner: user._id,
        title,
        description,
        extraInfo,
        perks,
        address,
        photos: addedPic,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setPlaceDetails([...data]);
      setRedirect(true);
      setReady(true);
      // window.location.pathname = "/account/places"; //important
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const handleImageDelete = (name) => {
    const newPics = addedPic.filter((imgName) => {
      return imgName !== name;
    });
    console.log(newPics);
    setAddedPic([...newPics]);
  };

  return (
    <div className="w-full flex flex-col items-center p-2">
      <form
        className="flex flex-col lg:w-1/2 gap-4"
        onSubmit={handleFormSubmit}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="border-2 border-gray-400 px-4 py-2 rounded-2xl "
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Address"
          className="border-2 border-gray-400 px-4 py-2 rounded-2xl "
        />
        <div className="grid grid-cols-3 gap-1">
          <input
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            placeholder="Enter link of your photo"
            className="border-2 border-gray-400 px-4 py-2 rounded-2xl col-span-2"
          />
          <button
            onClick={imageDownloader}
            className="bg-rose-500 rounded-2xl px-4 py-2 text-white"
          >
            Add Photo
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {addedPic?.map((imageName) => (
            <div className="relative" key={imageName}>
              <img
                className="rounded-lg object-cover aspect-square"
                src={`https://stay-ez-rqol.vercel.app/uploads/${imageName}`}
              />
              <div
                className="absolute top-2 right-2 text-2xl md:text-3xl text-rose-500 hover:text-black bg-white rounded-full cursor-pointer"
                onClick={() => handleImageDelete(imageName)}
              >
                <TiDelete />
              </div>
            </div>
          ))}
        </div>

        <label className="cursor-pointer w-1/2 px-6 py-8 flex gap-1 justify-center items-center border-2 border-gray-400 rounded-lg ">
          <RiUploadCloudLine className="text-3xl" />

          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            name="imageUploads"
            multiple="multiple"
          />

          <span>Upload</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="border-2 border-gray-400 px-4 py-2 rounded-2xl "
          placeholder="Add Something about this place"
        />
        <h2>Select All the Perks of your Place:</h2>
        <PlacePerks perks={perks} onChange={setPerks} />
        <h2>Extra Info:</h2>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          rows={6}
          className="border-2 border-gray-400 px-4 py-2 rounded-2xl "
          type="text"
          placeholder="House Rules, pets, etc..."
        />
        <h2>Check In, Check Out & Max Guests:</h2>
        <div className="grid grid-cols-4 grid-rows-2 grid-flow-col gap-2 text-center">
          <h3 className="text-gray-400">Check In:</h3>
          <input
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            type="number"
            className="border-2 border-gray-400 px-4 py-2 rounded-xl "
          />
          <h3 className="text-gray-400">Check Out:</h3>
          <input
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            type="number"
            className="border-2 border-gray-400 px-4 py-2 rounded-xl "
          />
          <h3 className="text-gray-400">Max Guests</h3>
          <input
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            type="number"
            min={1}
            className="border-2 border-gray-400 px-4 py-2 rounded-xl "
          />
          <h3 className="text-gray-400">Price</h3>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            min={0}
            className="border-2 border-gray-400 px-4 py-2 rounded-xl "
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddPlaces;
