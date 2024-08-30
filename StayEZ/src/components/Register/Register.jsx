import { useState } from "react";
import { GrLogin } from "react-icons/gr";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useeState(false);

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
    <div className="flex flex-col gap-12 p-4 items-center">
      <span className="text-4xl font-extrabold text-red-500 ">Register:</span>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 p-4"
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
      </form>
    </div>
  );
}

export default Register;
