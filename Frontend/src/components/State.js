import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import QRCode from "react-qr-code";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from "./Nav";




export default function AddContract() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Unauth";
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [state, setState] = useState("");
  const [contract,setContract]=useState("")
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg);
  }, [errMsg]);
//   useEffect(()=>{
//     console.log(contract)
    
//   },[contract])

  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    axios({
      method: "post", //you can set what request you want to be
      url: "http://127.0.0.1:5000/blockchain/create_contract",
      data: {
        id_code: user,
        is_vaccinated: true
        
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).
    then((res) => { 
        console.log(">>>>>",res.data.contract_address.contract_address)
        setContract(res.data.contract_address)
      setState("true")
      })
        
    .catch(err=>{
       navigate(from, { replace: true });
        setErrMsg("Failed");
    }
    );

  };
  return (
    <>
    < Nav style={{margin:"200px"}} />
    <section style={{display:"block"}} className="blur-container">

      <form onSubmit={handleSubmit}>
        <h1>VACCINE STATE</h1>

        {errMsg && <h1 style={{color:"red"}}>{errMsg}</h1>}
        {state && <h1 style={{color:"green"}}>{state}</h1>}
        <label htmlFor="username">USER ID</label>
        <input
          type="text"
          id="state"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
        <label className="switch" >
            is vaccineted
          <input
            type="checkbox"
            id="state"
            onChange={(e) => {setState(e.target.checked)
              console.log(">>>>",e.target.checked)
            }}
            autoComplete="off"
            
          ></input>
          <span className="slider round"></span>
        </label>

        <button> Change STATE </button>
      </form>
    </section>
    </>
  );
}
