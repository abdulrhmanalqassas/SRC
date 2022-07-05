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

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

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
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [user, password, matchPwd]);


  const handleSubmit =  (e) => {
    e.preventDefault();}
  return (
    <section className="blur-container">
       <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
      

      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
        {/* //user name */}
        <label htmlFor="username">
          User name
          {user && validUser && <FontAwesomeIcon icon={faCheck} />}
          {user && !validUser && <FontAwesomeIcon icon={faTimes} />}
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
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* password */}

        <label htmlFor="password">
          password
          {password && validPassword && <FontAwesomeIcon icon={faCheck} />}
          {password && !validPassword && <FontAwesomeIcon icon={faTimes} />}
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
          Must include uppercase and lowercase letters, a number and a special
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
          {matchPwd && validMatchPwd && <FontAwesomeIcon icon={faCheck} />}
          {matchPwd && !validMatchPwd && <FontAwesomeIcon icon={faTimes} />}
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
          Must match the first password input field.
        </p>

        <button disabled={validMatchPwd && validPassword && validUser? false:true}>Sign Up</button>
      </form>
    </section>
  );
}
