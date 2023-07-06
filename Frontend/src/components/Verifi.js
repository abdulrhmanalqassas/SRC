import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import QRCode from "react-qr-code";
import useAuth from "../hooks/useAuth";
import Nav  from "./Nav";
import {Success}  from './Success'
import {Fake}  from './Fake'
import PopUp from './PopUp'
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


export default function Verifi() {
  const auth = useAuth();
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [state, setState] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  let toggleBodyMessage = "ERROR HAPPENED WHILE PROCESSING YOUR REQUEST  "

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
      url: "http://127.0.0.1:5000/v1/blockchain/verify-contract",
      data: {

        productId: user,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then(
      (res) =>{
        res.response?.status === 200 ? toggleBodyMessage = "Product is verified " : toggleBodyMessage = "Product is fake " 
        console.log(res)
        toggleShow()
      } 
    ).catch(
      (err)=>{
        if (err.response?.status === 404){
          setErrMsg("The Product ID does not exist ")
          toggleBodyMessage = "The Product ID does not exist"
          
        }
        else {
          setErrMsg("SOME ERROR HAPPENED  ")
        }
        toggleShow()
        //we need to create a fail toggle 
      }

    );

    
  };
  return (
    <>
    < Nav style={{margin:"200px"}} />

    
    <section style={{display:"block"}} className="blur-container">
    
      <form onSubmit={handleSubmit}>
    <h1>PRODUCT VERIFICATION</h1>
    
        <label htmlFor="username">PRODUCT Code</label>
        <input
          type="text"
          id="username"
          onChange={(e) => {setUser(e.target.value) ; }}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
        <button> VERIFICATION </button>
      </form>
    </section>
    {user  && 

<MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
<MDBModalDialog centered>
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle>PRODUCT RESULT</MDBModalTitle>
      <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
    </MDBModalHeader>
    <MDBModalBody>
      
        {!errMsg ? <Success/> : <Fake/>}
      
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
