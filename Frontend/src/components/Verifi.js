import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import QRCode from "react-qr-code";
import useAuth from "../hooks/useAuth";
import Nav  from "./Nav";

export default function Verifi() {
  const auth = useAuth();
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [state, setState] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg);
  }, [errMsg]);
  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post", //you can set what request you want to be
      url: "http://127.0.0.1:5000/blockchain/verify-contract",
      data: {

        contract_address: "0xbfB907F863dcF02B13A",
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then(
      (res) =>{
        console.log(res)
        setState(res.data.state)
      } 
    ).catch(
      (err)=>{
        if (err.response?.status === 404){
          setErrMsg("The Vaccine ID does not exist ")
        }
      }

    );

    
  };
  return (
    <>
    < Nav style={{margin:"200px"}} />


    <section style={{display:"block"}} className="blur-container">

{}
      <form onSubmit={handleSubmit}>
    <h1>VACCINE VERIFICATION</h1>
    {(auth.id_cude || localStorage.getItem("ID")||"null" )&& <div
      style={{
        background: "white",
        width: "170px",
        height:"170px",
      }}
    >
      <QRCode size={150} value={auth.id_cude || localStorage.getItem("ID")||"null" } />
    </div>}
    {errMsg && <h1 style={{color:"red"}}>{errMsg}</h1>}
        <label htmlFor="username">VACCINE Code</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
        <button> VERIFICATION </button>
      </form>
    </section>
    </>
  );
}
