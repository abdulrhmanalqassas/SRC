import React from "react";
import brandIcon from "../images/blockchain.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios,{REFRESH_END_POINT} from "../api/axios";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const {auth} = useAuth()
  
  const from = location.state?.from?.pathname || "/";

  async function getRefreshToken() {
    const response = await axios.get(REFRESH_END_POINT , {withCredentials : true})
    console.log(response.data)
  }
  return (
    <nav>
      <h2 className="logo">
        KAFR EL-SHEIKH<span>UNIVERSITY</span>
      </h2>
      <ul>
        <Link to="/Verify">
          <li className="li">PRODUCT VERIFICATION</li>
        </Link>
        <Link to="/addContract">
          <li className="li">add contract </li>
        </Link>
        <Link to="/">
          <li className="li">Home</li>
        </Link>
      </ul>
      {!auth.token && <Link to="/login">
      <p className="btn">signin</p>
      </Link>}
      { !auth.token && <Link to="/register">
      <p className="btn">signup</p>
      </Link>}

      {auth.token &&
        <Link to="/logout">
        <p className="btn">logout</p>
        </Link>
      }
      {auth.token &&
        <Link to="/resetPassword">
        <p className="btn">Reset Password </p>
        </Link>
      }
    </nav>
  );
}



