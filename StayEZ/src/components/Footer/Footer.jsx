import { FaRegCopyright } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { GrLinkedin } from "react-icons/gr";
function Footer() {
  return (
    <div className="flex flex-col gap-2 border-t-4 p-4">
      <div className="flex justify-around">
        <div className="flex items-center gap-1 ">
          <span>
            <FaRegCopyright />
          </span>
          <span>StayEZ</span>
        </div>
        <div className="flex gap-2 underline text-rose-600">
          <button>Privacy</button>
          <button>Terms</button>
          <button>About</button>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaFacebook />
          <RiInstagramFill />
          <GrLinkedin />
        </div>
      </div>
      <span className="text-sm text-gray-500 w-3/4 text-center mx-auto text-pretty">
        At StayEZ, we believe in making travel accessible and hassle-free. Our
        mission is to connect travelers with quality accommodations that meet
        their unique needs and preferences.
      </span>
    </div>
  );
}

export default Footer;
