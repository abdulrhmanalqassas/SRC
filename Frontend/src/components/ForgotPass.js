
import axios from "../api/axios";
import { useRef, useState, useEffect, useContext } from "react";
import {FORGOTTEN_PASS_END_POINT} from '../api/axios'
import Nav  from "./Nav";


export const ForgotPass = () => {
    const [email , setEmail] = useState("")
    const userRef = useRef();
    const   handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(
            FORGOTTEN_PASS_END_POINT,
          {
            email: email,            
          },
        )
    }
    ;
    return (
        <>
        < Nav style={{margin:"200px"}} />
        <section className="blur-container">
      <div className="background">
        
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Find Your Account </h1>
        <h6>Please enter your email address to search for your account.</h6>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          value={email}
        ></input>

        <button disabled={email ? false : true}> SUBMIT</button>
      
      </form>
    </section>
    </>
    ) ; 
} 