import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
export default function Login(){
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();

    const [user,setUser]= useState("")

    const [password,setPassword]=useState("")

    useEffect(() => {
        userRef.current.focus();
    }, [])


    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log(user,password)
      }
      setAuth({password , user})


    return(
        <section className="blur-container">
        <div  className="background">
         <div className="shape"></div>
         <div className="shape"></div>
     </div>
       
 
       <form onSubmit={handleSubmit}>
       <h1>Login</h1>
         {/* //user name */}
         <label htmlFor="username">
           User name
           
         </label>
         <input
           type="text"
           id="username"
           onChange={(e) => setUser(e.target.value)}
           ref={userRef}
           autoComplete="off"
           required
           value={user}
           
         ></input>
         {/* password */}
 
         <label htmlFor="password">
           password
          
         </label>
         <input
           type="password"
           id="password"
           onChange={(e) => setPassword(e.target.value)}
           autoComplete="off"
           required
          value={password}
         ></input>
 
         <button disabled={ password && user? false:true}> Login</button>
       </form>
     </section>
    )
}