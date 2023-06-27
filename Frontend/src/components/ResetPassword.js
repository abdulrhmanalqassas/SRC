import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import {LOGIN_END_POINT} from '../api/axios'

export default function Login() {
    // const { setAuth } = useContext(AuthContext);
  
    const userRef = useRef();
  
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");  
    const [errMsg, setErrMsg] = useState("");
    const [success,setSuccess]= useState("");
  
    useEffect(() => {
      userRef.current.focus();
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axios
          .post(LOGIN_END_POINT , {
            password:password,
            confirm_password:newPassword
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          })
          .then(function (response) {
            console.log(response);
            setSuccess(response.data)
            setNewPassword("")
            setPassword("");
          });
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
        
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
          <h1>Reset password</h1>
 
         {success&&<p>
          {success}</p>}
          {/* password */}
  
          <label htmlFor="password">New password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            ref={userRef}
            autoComplete="off"
            required
            value={password}
          ></input>

<label htmlFor="Newpassword">Confirm password</label>
          <input
            type="password"
            id="Newpassword"
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="off"
            required
            value={newPassword}
          ></input>
  
  
          <button disabled={password && newPassword? false : true}> Login</button>
  
        </form>
      </section>
    );
  }
  