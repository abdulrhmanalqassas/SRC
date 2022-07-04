import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const userRef = useRef();
  const passwordRef = useRef();
  
  const [user, setUser] = useState('');
  const [validUser,setValidUser] = useState(false)

  const [password,setPassword] = useState("")
  const [validPassword,setValidPassword] = useState(false)

  const [matchPwd,setMatchPwd]= useState("")
  const [validMatchPwd,setValidMatchPwd] = useState(false)

  //ON componant lood use ref set focus in user input
  useEffect(() => {
    userRef.current.focus();
}, [])
    useEffect(()=>{
        setValidUser(USER_REGEX.test(user))
        console.log(user,validUser)
    }
    ,[user])

    useEffect(()=>{
        setValidPassword( PWD_REGEX.test(password));
        setValidMatchPwd(password===matchPwd)
    }
    ,[user])

  return (
    <section>
      <h1>Register</h1>

      <form>
        <label htmlFor="username">User name
        {user&&validUser&& <FontAwesomeIcon icon={faCheck}  />}
       {
        !user&&!validUser&&<FontAwesomeIcon icon={faTimes}  />
       } 
        </label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
        ></input>


        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
        ></input>


        <label htmlFor="confirm_password">
            confirm_password
           
            </label>
        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
        ></input>

<button disabled={false}>Sign Up</button>
      </form>
    </section>
  );
}
