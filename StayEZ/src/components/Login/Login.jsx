import { useContext, useState } from "react";
import { GrLogin } from "react-icons/gr";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
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
    <div className="flex items-center justify-center ">
      <div className="w-1/2 overflow-hidden sm:block hidden">
        <img className="xl:w-4/6 " src="/7118758_3323619.jpg" alt="" />
      </div>
      <div className="flex flex-col gap-4 p-4 items-center sm:-ml-8">
        <span className="text-4xl font-extrabold text-red-500 ">Login:</span>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 w-full p-4"
        >
          <h2 className="text-2xl px-2">Hello, Welcome Back!</h2>
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
          <p className="text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link className="text-rose-500" to={"/register"}>
              Register
            </Link>{" "}
            here.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
