import React from "react";
import TopBar from "./pages/TopBar";
import Sidebar from "./pages/Sidebar";
import "./styling/layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <div className="h-screen w-screen">
        <div className="h-[15%] border mb-1 ">
          <TopBar />
        </div>
        <div className="flex flex-row" style={{flexDirection:"row"}}>
          <div className="w-[20%] border">
            <Sidebar />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
