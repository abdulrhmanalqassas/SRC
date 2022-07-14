import React from "react";
import brandIcon from "../images/blockchain.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return (
    <nav>
      <h2 className="logo">
        KS<span>U</span>
      </h2>
      <ul>
        <Link to="/Verifi">
          <li className="li">VACCINE VERIFICATION</li>
        </Link>
        <Link to="/Verifi">
          <li className="li">Home</li>
        </Link>
        <Link to="/Verifi">
          <li className="li">Home</li>
        </Link>
      </ul>
      <p className="btn">Subscribe</p>
    </nav>
  );
}
