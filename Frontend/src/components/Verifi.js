import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";


export default function Verifi(){

const userRef = useRef();

const [user, setUser] = useState("");

const [errMsg, setErrMsg] = useState("");

useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg)
  }, [errMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        method: 'post', //you can set what request you want to be
        url: 'http://127.0.0.1:5000/blockchain/create_contract',
        data: {id_card:"F04613D339a4C86c",contract_address:"0xbfB907F863dcF02B13A"},
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
        
      }).then(
        (res)=>console.log(res)
    )

    //   axios
    //     .post(
    //       "/blockchain/verify-contract",
    //       {
    //         contract_address:"0xbfB907F863dcF02B1369C9678827b7645dc02CcA"
    //       },
    //       {headers: {"Access-Control-Allow-Origin": "*"} }

    //     )
    //     .then(function (response) {
    //       console.log(response);
         
    //     }).catch(err=>
    //       {console.log("error msg ",err)
    //       console.log(err);
    //       if (!err?.response) {
    //         setErrMsg("No Server Response");
    //       } else if (err.response?.status === 400) {
    //         setErrMsg("Missing Username");
    //       } else if (err.response?.status === 401) {
    //         setErrMsg("rong information");
    //       } else {
    //         setErrMsg("Failed");
    //       }
    //     });
    } 
  ;
    return(
        <section className="blur-container">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
  
        <form onSubmit={handleSubmit}>
          <h1>VACCINE VERIFICATION</h1>
  
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
          <button> VERIFICATION </button>
  
         
          
        </form>
      </section>
    )
}