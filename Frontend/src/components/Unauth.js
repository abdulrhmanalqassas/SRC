import React from "react";
import { Link } from "react-router-dom";

export default function Unauth(props){
   return(
    <section className="blur-container">
        
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>

    <form >
     <h1>
        unauthorized
     </h1>
     <h1>
     login with different account?<br />
            <span className="line">
                <Link to="/LOGIN">LOGIN</Link>
            </span>
        </h1>
    </form>
  </section>
   )
}