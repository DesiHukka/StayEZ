import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between p-4">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
