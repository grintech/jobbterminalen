import React from "react";
import "./newdash.css";
import Sidebar from "./Sidebar";
import DashNav from "./Dashnav";



const RecruiterDashboard = () => {

  return (
    <>
      <div className="main_wrapper">
        <Sidebar  />

        <div className="main_content">
          <DashNav />
          <div className="container px-sm-5">
            <h4 className=" py-4 mt-4">Welcome to the dashboard </h4>
           <div className="mt-5 col-lg-4 col-11 mx-auto">
           </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;

