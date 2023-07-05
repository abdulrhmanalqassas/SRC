
import axios from "../api/axios";
import { useRef, useState, useEffect, useContext } from "react";
import {FORGOTTEN_PASS_END_POINT} from '../api/axios'
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


export const ForgotPass = () => {
    const [email , setEmail] = useState("")
    const  [response , setResponse] = useState("")
    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);
    const userRef = useRef();
    const   handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(
            FORGOTTEN_PASS_END_POINT,
          {
            email: email,            
          },
        ).then(res => {
          if(res.status === 200 ) {
            setResponse("Please Check Your Inbox ")
          }
          else setResponse("Error was happened, please double check your email you provided ")
          setEmail("")
          console.log(res)
          toggleShow()
        
        })
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

    {response  && 

<MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
<MDBModalDialog centered>
  <MDBModalContent>
    <MDBModalHeader>
      <MDBModalTitle>Forgetten Password </MDBModalTitle>
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
    ) ; 
} 