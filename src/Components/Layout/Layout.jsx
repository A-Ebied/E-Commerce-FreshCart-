import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Offline, Online } from "react-detect-offline";
import backGround from "../../Assets/images/light-patten.svg";

export default function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className=""  style={{backgroundImage:`url(${backGround})`}}>
        <Outlet></Outlet>
      </div>

      <div>
        {/* <Online>Only shown when you're online</Online> */}
        <Offline>
          <div className="network">
            <i className="fas fa-wifi"> You Are Offline </i>
          </div>
        </Offline>
      </div>

      <Footer />
    </>
  );
}
