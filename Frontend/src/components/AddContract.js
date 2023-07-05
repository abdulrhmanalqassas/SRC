import { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios, {AddContract_END_POINT} from '../api/axios'
import {Success} from './Success'

export default function AddContract() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Unauth";
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [state, setState] = useState("");
  const [contract,setContract]=useState("")
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg);
  }, [errMsg]);
  const handleSubmit = (e) => {
    
    e.preventDefault();
    axiosPrivate
        .post(
          '/v1/blockchain/create_contract',
          {
            product_code: user,
          }
        ).then(res => {
          console.log(res.data)
          
        })
    .catch(err=>{
      console.log("this is the error in catch func ")
      console.log(err)
       //navigate('/login');
        setErrMsg("Failed");
    }
    );

  };
  return (
    <>
    < Nav style={{margin:"200px"}} />
    <section style={{display:"block"}} className="blur-container">
    {user && <Success/>}
      <form onSubmit={handleSubmit}>
        <h1>ADD PRODUCT </h1>
        {errMsg && <h1 style={{color:"red"}}>{errMsg}</h1>}
        {state && <h1 style={{color:"green"}}>{state}</h1>}
        <label htmlFor="username">PRODUCT ID</label>
        <input
          type="text"
          id="state"
          onChange={(e) => {console.log(e.target.value) ; setUser(e.target.value)}}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
       

        <button> SUBMIT </button>
      </form>
      
    </section>
    </>
  );
}
