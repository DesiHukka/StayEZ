import { useState } from "react";
import { GrLogin } from "react-icons/gr";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "/register",
      {
        name,
        email,
        pass,
      },
      {
        withCredentials: true,
      }
    );
    if (data) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 overflow-hidden sm:block hidden">
        <img className="xl:w-4/6 " src="/7230635_3588964.jpg" alt="" />
      </div>
      <div className="flex flex-col gap-8 items-center sm:w-1/3">
        <span className="text-4xl font-extrabold text-red-500 ">Register:</span>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 p-4 w-4/5"
        >
          <input
            type="text"
            placeholder="full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-400 px-6 py-2 rounded-2xl "
          />
          <input
            type="email"
            placeholder="email@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-400 px-6 py-2 rounded-2xl "
          />
          <input
            type="password"
            placeholder="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="border-2 border-gray-400 px-6 py-2 rounded-2xl"
          />
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-rose-500 rounded-3xl py-4 text-white font-bold text-lg"
          >
            <span>Register</span>
            <GrLogin className="text-2xl" />
          </button>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link className="text-rose-500" to={"/login"}>
              Login here...
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
