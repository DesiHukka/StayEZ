import { MdOutlineTravelExplore } from "react-icons/md";
import { BsSearchHeartFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";
import { useContext } from "react";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
function Header() {
  const { user } = useContext(userContext);

  return (
    <header className="flex justify-around my-2 border-b-4 p-2 ">
      <Link to={"/"}>
        <div className="md:flex gap-2 items-center hidden">
          <MdOutlineTravelExplore className="text-rose-600 text-3xl" />
          <span className="font-bold text-rose-500 text-lg">StayEZ</span>
        </div>
      </Link>
      <div className="flex flex-row  gap-2 border-2 sm:border-gray-300 border-rose-400 px-4 py-2 rounded-full sm:shadow-sm shadow-md shadow-rose-400 items-center">
        <div>Anywhere</div>
        <div className="border border-gray-300  h-8"></div>
        <div>Any week</div>
        <div className="border border-gray-300  h-8"></div>
        <div>Add guests</div>
        <button className="bg-rose-500 p-2 rounded-full text-white">
          <BsSearchHeartFill />
        </button>
      </div>

      <Link
        to={user ? "/account" : "/login"}
        className="hidden xs:flex gap-2 items-center text-lg border-2 px-4 rounded-full text-gray-600"
      >
        <GiHamburgerMenu />
        <FaCircleUser className="text-2xl hidden sm:inline" />
        {user?.name}
      </Link>
    </header>
  );
}

export default Header;
