import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {SIGNIN_END_POINT} from '../api/axios'
import { ForgotPass } from "./ForgotPass";
import Nav from "./Nav";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();

  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg)
  }, [errMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();


      axios
        .post(
          SIGNIN_END_POINT,
          {
            email: user,
            password: password,
            
          },
          {
            withCredentials : true,
            
          }
        )
        .then(function (response) {
          console.log(`this is the response :`);
          console.log(response)
          const token = response.data.accessToken;
          const ID = response.data.id_code;
          const email = response.data.email;
          const name = response.data.name;

          setAuth({ password, name, email, ID, token });
          localStorage.setItem("token",token)
          localStorage.setItem("ID",ID)
          localStorage.setItem("name",name)
          setUser("");
          setPassword("");
          navigate("/addContract"); 
        }).catch(err=>
          {console.log("error msg ",err)
          console.log(err);
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
          } else if (err.response?.status === 401) {
            setErrMsg("wrong information");
          } else {
            setErrMsg("Login Failed");
          }
        });
    } 
  ;

  return (
    <>
    < Nav style={{margin:"200px"}} />
    <section className="blur-container">
      <div className="background">

      </div>

      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {errMsg&&<h1>{errMsg}</h1>}
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
        {/* password */}

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
          value={password}
        ></input>

        <button disabled={password && user ? false : true}> Login</button>
      <br/>
        <p>
        Did you forget you pass? use link below 
          <br />
          <span className="line">
            <Link to="/forgotPass">forgotten password?</Link>
          </span>
        </p>
        <br/>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </section>
    </>
  );
}
