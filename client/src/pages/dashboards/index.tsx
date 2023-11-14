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



      <div className="row g-4">
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-3"><div className="box e-skeleton"></div></div>
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-3"><div className="box e-skeleton"></div></div>
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-3"><div className="box e-skeleton"></div></div>
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-3"><div className="box e-skeleton"></div></div>
      </div>
      <div className="row g-4 mt-1">
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-8">
          <div className="box h_16 flex-center"><h1>Dashboard</h1></div>
          <div className="row g-4 mt-1">
            <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6"><div className="box h_24 e-skeleton"></div></div>
            <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6"><div className="box h_24 e-skeleton"></div></div>
          </div>
        </div>
        <div className="col col-sm-12 col-md-6 col-lg-6 col-xl-4">
          <div className="box h_36 p-4"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;