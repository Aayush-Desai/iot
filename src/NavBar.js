import React from "react";
import "./Navbar.css";
import AbtUs from "./AboutUs";
import ContUs from "./ContactUs";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="header">
      <div className="header__logo">
        <h3>
        IoT {" "}<span className="bluefont">WEB APP</span>
        </h3>
      </div>
    </div>
  );
}

export default Navbar;
