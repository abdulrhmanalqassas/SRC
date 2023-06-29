import { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios, {AddContract_END_POINT} from '../api/axios'


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
//   useEffect(()=>{
//     console.log(contract)
    
//   },[contract])

  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    axiosPrivate
        .post(
          '/fail',
        )
    .catch(err=>{
      console.log("this is the error in catch func ")
      console.log(err)
       navigate('/login');
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
