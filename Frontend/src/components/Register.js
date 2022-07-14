import { useRef, useState, useEffect,useContext } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const ID_REGEX = /[A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const [ID, setID] = useState("");
  const [validID, setValidID] = useState(false);
  const [IDFocus, setIDFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  //ON componant lood use ref set focus in user input
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidID(ID_REGEX.test(ID));
  }, [ID]);

  useEffect(() => {
    setValidEmail(EMAIL_REGX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [user, password, matchPwd]);


  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(user,password)
    // if u gona post .post('/',{data to be post},headers and more)
    //   const response = await axios.post(LOGIN_URL,
//     JSON.stringify({ ID:idcode,user, pwd,email }),
//     {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//     }
// );
// console.log(JSON.stringify(response?.data));
    try{
  //     axios.get('/')
  // .then(function (response) {
  //   // handle success
  //   console.log(JSON.stringify(response));
  //   console.log(response.data)
  // })
  axios.post('/auth/register/', {
    "id_code": ID,
   "name": user,
   "email": email,
   "password": password
})
  .then(function (response) {
    console.log(response)
    const token = response.data.token;
          const ID = response.data.id_code;
          const email = response.data.email;
          const name = response.data.name;
          setAuth({name, email, ID, token });
          console.log("llllllll",name, email, ID, token)
          localStorage.setItem("token",token)
          localStorage.setItem("ID",ID)
          localStorage.setItem("name",name)
          navigate(from, { replace: true });
  })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <section className="blur-container">
       <div  className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
      

      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
        {/* //user name */}
        <label htmlFor="username">
          User name
          {user && validUser && <FontAwesomeIcon  className="check"      icon={faCheck} />}
          {user && !validUser && <FontAwesomeIcon className="not-check" icon={faTimes} />}
        </label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        ></input>
        <p className={userFocus && user && !validUser ? "hi" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers,
          <br />
          underscores, hyphens allowed.
        </p>

        {/* //ID */}
        <label htmlFor="ID">
          User ID
          {ID && validID && <FontAwesomeIcon  className="check"      icon={faCheck} />}
          {ID && !validID && <FontAwesomeIcon className="not-check" icon={faTimes} />}
        </label>
        <input
          type="text"
          id="ID"
          onChange={(e) => setID(e.target.value)}
          autoComplete="off"
          required
          onFocus={() => setIDFocus(true)}
          onBlur={() => setIDFocus(false)}
        ></input>
        <p className={IDFocus && ID && !validID ? "hi" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          
          ONLY
          Letters, numbers,
          <br />
          underscores, hyphens allowed.
        </p>

       {/* //email */}
       <label htmlFor="email">
          email
          {email && validEmail && <FontAwesomeIcon  className="check"      icon={faCheck} />}
          {email && !validEmail && <FontAwesomeIcon className="not-check" icon={faTimes} />}
        </label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        ></input>
        <p className={emailFocus && email && !validEmail ? "hi" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          ONLY valid email 
        </p>


        {/* password */}

        <label htmlFor="password">
          password
          {password && validPassword && <FontAwesomeIcon   className="check"     icon={faCheck} />}
          {password && !validPassword && <FontAwesomeIcon  className="not-check" icon={faTimes} />}
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        ></input>
        <p
          className={
            pwdFocus && password && !validPassword ? "hi" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase 
          <br /> and lowercase letters,
          <br />
           a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        {/* confirm_password */}
        <label htmlFor="confirm_password">
          confirm_password
          {matchPwd && validMatchPwd && <FontAwesomeIcon   className="check"     icon={faCheck} />}
          {matchPwd && !validMatchPwd && <FontAwesomeIcon  className="not-check" icon={faTimes} />}
        </label>
        <input
          type="password"
          id="confirm_password"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          onFocus={() => setMatchPwdFocus(true)}
          onBlur={() => setMatchPwdFocus(false)}
        ></input>
        <p
          className={
            matchPwdFocus && matchPwd && !validMatchPwd ? "hi" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password
           <br /> input field.
        </p>

        <button disabled={validMatchPwd && validPassword && validUser? false:true}>Sign Up</button>

        <p>
                have an Account?<br />
                <span className="line">
                    <Link to="/LOGIN">LOGIN</Link>
                </span>
            </p>
      </form>
    </section>
  );
}
