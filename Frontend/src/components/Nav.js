import React from "react";
import brandIcon from "../images/blockchain.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return (
    <nav>
      <div className="imageLogo"> <a href = "/"> <img src="../images/BC_logo.png"/></a></div>
      <h2 className="logo">
      KAFR EL-SHEIKH <span>University</span>
      </h2>
      <ul>
        <Link to="/Verifi">
          <li className="li">PRODUCT VERIFICATION</li>
        </Link>
        <Link to="/">
          <li className="li">Home</li>
        </Link>
      </ul>
      <Link to="/login">
      <p className="logout">sign In</p>
      </Link>
      <Link to="/register">
      <p className="logout">signup</p>
      </Link>
    </nav>
  );
}
