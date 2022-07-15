import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import QRCode from "react-qr-code";
import Nav from "./Nav";
export default function Verifi() {
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
      url: "http://192.168.1.4:5000/blockchain/create_contract",
      data: {
        id_code: user,
        is_vaccinated: state
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).
    then((res) => { 
        console.log(">>>>>",res.data.contract_address.contract_address)
        setContract(res.data.contract_address)})
    .catch(err=>{
       
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
            }}
            autoComplete="off"
            
          ></input>
          <span class="slider round"></span>
        </label>

        <button> Change STATE </button>
      </form>
    </section>
    </>
  );
}
