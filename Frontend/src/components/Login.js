import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();

  const [user, setUser] = useState("");

  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "/auth/login/",
          {
            id_code: user,
            password: password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then(function (response) {
          console.log(response);
          const token = response.data.token;
          const ID = response.data.id_code;
          const email = response.data.email;
          const name = response.data.name;
          setAuth({ password, name, email, ID, token });
          setUser("");
          setPassword("");
        });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <section className="blur-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* //user name */}
        <label htmlFor="username">ID number</label>
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

        <p>
          Need an Account?
          <br />
          {/* <span className="line">
            <Link to="/register">Sign Up</Link>
          </span> */}
        </p>
      </form>
    </section>
  );
}
