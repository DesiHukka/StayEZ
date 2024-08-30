import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import axios from "axios";
import { Provider } from "./context/userContext";
import Account from "./components/Account/Account";
import Home from "./components/Home/Home";

axios.defaults.baseURL = "https://stayez.onrender.com";
axios.defaults.withCredentials = true; //Removing this will not set cookies

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="listing/:id" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account/:subpage?" element={<Account />} />
      <Route path="account/:subpage/:id" element={<Account />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
