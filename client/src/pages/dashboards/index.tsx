import React, { FC, useRef } from "react";
import logo from "assets/images/logo.svg"
import logo1 from "assets/images/logo1.svg";
import './style.scss'

const Dashboard: FC = (): JSX.Element => {

  console.log("home");

  return (
    <div className="dashboard">
      {/* <h1>Dashboard</h1> */}
      {/* <div className="d-flex justify-content-between w-50"> */}
      {/* <img src={logo} alt="" /> */}
      {/* <img src={logo1} alt="" /> */}
      {/* </div> */}



      <div className="grid grid-cols-4 gap-4">
        <div className="col"><div className="box e-skeleton"></div></div>
        <div className="col"><div className="box e-skeleton"></div></div>
        <div className="col"><div className="box e-skeleton"></div></div>
        <div className="col"><div className="box e-skeleton"></div></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2">
          <div className="box h_16 flex-center"><h1>Dashboard</h1></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className=""><div className="box h_20 e-skeleton"></div></div>
            <div className=""><div className="box h_20 e-skeleton"></div></div>
          </div>
        </div>
        <div className="col">
          <div className="box h_36 p-4"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;