import React from "react";
import useAuth from "../hooks/useAuth";
import Nav from "./Nav";
import { Link, useNavigate, useLocation } from "react-router-dom";

// hi from here just testing ....
export default function Land() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <>
      <div className="hero">
        <Nav />

        <div className="content">
          <h4>Hello,{auth.name}</h4>
          <h1>
            the <span>BLOCKCHAIN</span>
          </h1>
          <h3> PRODUCT VERIFICATION SYSTEM</h3>
          <div className="newslatter"></div>
        </div>
        
      </div>

      <section className="about">
        <div className="main">
          <img alt="hgu" src="img/main-img.png" />
          <div className="about-text">
            <h2>About THE PROJECT</h2>
            <h5>
              SAVE <span>& SECURE</span>
            </h5>
            <p>
            A blockchain-based product verification system is a technological solution that enables
             consumers to verify the authenticity of a product by checking its unique digital signature
              recorded on a blockchain ledger. The system works by assigning a digital signature to each
               product during its production, which is then recorded on a blockchain network. 
               The digital signature is a unique code that cannot be replicated or altered,
                and it serves as a tamper-proof record of the product's origin and authenticity.
                 Consumers can scan the product's digital signature using a smartphone app to access the blockchain
                  ledger and verify the product's authenticity. 
                  This system provides a secure and transparent way for consumers to authenticate products,
                   which can help to prevent counterfeiting and build trust between consumers and manufacturers.
            </p>
            <button type="button">Let's Talk</button>
          </div>
        </div>
      </section>

      <div className="service">
        <div className="title">
          <h2>Our Services</h2>
        </div>

        <div className="box">
          <div className="card">
            <i className="fas fa-bars"></i>
            <h5>PRODUCT VERIFICATION </h5>
            <div className="pra">
              <p>
                verify your Product or other (other is only for admin )
              </p>
            </div>
            <Link to="/Verify">
              <div className="button">PRODUCT VERIFICATION</div>
            </Link>
          </div>

          <div className="card">
            <i className="far fa-user"></i>
            <h5>ADD YOUR PRODUCT TO BE KEPT IN BLOCKCHAIN</h5>
            <div className="pra">
              <p>
                Add your product in the blockchain to prevent it from being faked 
              </p>
              <Link to="/register">
                <div className="button">ADD PRODUCT</div>
              </Link>
            </div>
          </div>

          <div className="card">
            <i className="far fa-bell"></i>
            <h5>SECURE INFORMATION</h5>
            <div className="pra">
              <p>
                all of the information is SECURE and Save against hackers dnd data
                violations
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>BLOCKCHAIN is the future </p>

        <p className="end">CopyRight By.KAFR EL-SHEIKH UNIVERSITY </p>
      </footer>
    </>
  );
}
