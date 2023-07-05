import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {RESET_PASS_END_POINT} from '../api/axios'
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Nav from "./Nav";


export default function Login() {
    // const { setAuth } = useContext(AuthContext);
  
    const userRef = useRef();
  
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");  
    const [errMsg, setErrMsg] = useState("");
    const [success,setSuccess]= useState("");
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
      userRef.current.focus();
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        axiosPrivate
          .post(RESET_PASS_END_POINT, {
            password:password,
            confirm_password:newPassword
          },
          )
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
      <>
      < Nav style={{margin:"200px"}} />
      
      
      
      <section className="blur-container">
        
        <div className="background">
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
  
  
          <button disabled={password && newPassword? false : true}> RESET</button>
  
        </form>
      </section>
      </>
    );
  }
  