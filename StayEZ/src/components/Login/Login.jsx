import { useContext, useState } from "react";
import { GrLogin } from "react-icons/gr";
import axios from "axios";
import { Navigate } from "react-router-dom";
import userContext from "../../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(userContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/login", {
      email,
      pass,
    });
    if (response.data) {
      setRedirect(true);
      setUser(response.data);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex flex-col gap-12 mt-20 p-4  items-center">
      <span className="text-4xl font-extrabold text-red-500 ">Login:</span>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 p-4"
      >
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
          <span>Login</span>
          <GrLogin className="text-2xl" />
        </button>
      </form>
    </div>
  );
}

export default Login;
