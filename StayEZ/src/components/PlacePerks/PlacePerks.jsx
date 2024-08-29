import { MdOutlineWifi } from "react-icons/md";
import { MdSoupKitchen } from "react-icons/md";
import { MdOutlineLocalDining } from "react-icons/md";
import { BiSolidCctv } from "react-icons/bi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";
import { GiWashingMachine } from "react-icons/gi";
import { PiTelevisionFill } from "react-icons/pi";

function PlacePerks({ perks, onChange }) {
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      onChange([...perks, e.target.name]);
    } else {
      onChange([...perks.filter((name) => name !== e.target.name)]);
    }
  };
  console.log(perks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="wifi" onChange={handleCheckBox} />
        <MdOutlineWifi />
        <span>Wifi</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="kitchen" onChange={handleCheckBox} />
        <MdSoupKitchen />
        <span>Kitchen</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="dining area" onChange={handleCheckBox} />
        <MdOutlineLocalDining />
        <span>Dining Area</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input
          type="checkbox"
          name="security camera"
          onChange={handleCheckBox}
        />
        <BiSolidCctv />
        <span>Security Cameras</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="smoke alarm" onChange={handleCheckBox} />
        <RiAlarmWarningFill />
        <span>Smoke Alarm</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input
          type="checkbox"
          name="air conditioning"
          onChange={handleCheckBox}
        />
        <TbAirConditioning />
        <span>Air Conditioning</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="free parking" onChange={handleCheckBox} />
        <LuParkingCircle />
        <span>Free Parking</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input
          type="checkbox"
          name="washing machine"
          onChange={handleCheckBox}
        />
        <GiWashingMachine />
        <span>Washing Machine</span>
      </label>
      <label className="flex  items-center gap-2 text-xl border-2 p-6">
        <input type="checkbox" name="tv" onChange={handleCheckBox} />
        <PiTelevisionFill />
        <span>TV</span>
      </label>
    </div>
  );
}

export default PlacePerks;
