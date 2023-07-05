import { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Nav from "./Nav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios, {AddContract_END_POINT} from '../api/axios'
import {Success} from './Success'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';


export default function AddContract() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Unauth";
  const userRef = useRef();
  const  [response , setResponse] = useState("")
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
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
          if(res.status === 200  || res.status === 201 ) setResponse("Product was added Successfully ")
          else {
            setResponse(res?.response.data.message)
            console.log("error in else statement !!")
          }
          
        })
    .catch(err=>{
      console.log("this is the error in catch func ")
      console.log(err)
       //navigate('/login');
       setResponse("Failed to create that contract, Internal error may happened");
    }
    );
    toggleShow()
    setUser("")

  };
  return (
    <>
    < Nav style={{margin:"200px"}} />
    <section style={{display:"block"}} className="blur-container">
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

    {response  && 

<MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
<MDBModalDialog centered>
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle> Add New Product  </MDBModalTitle>
      <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
    </MDBModalHeader>
    <MDBModalBody>
      
    <h6>{response}</h6>
      
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color='secondary' onClick={toggleShow}>
        Close
      </MDBBtn>
    </MDBModalFooter>
  </MDBModalContent>
</MDBModalDialog>
</MDBModal>
    
    }
    </>
  );
}
