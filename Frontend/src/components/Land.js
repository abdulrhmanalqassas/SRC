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
          <h1>
            the <span>BLOCKCHAIN</span>
          </h1>
          <h3> PRODUCT VERIFICATION SYSTEM , Be early to the future of WEB3</h3>
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
              This software system will be a web abb on top of a block chain to
              help users and governments to Check and insure the vaccine state
              of the citizens. This system will be implemented and designed to
              ens ure the   authenticity and validity of the data using the
              blockchain techn ology and keeping in mind being user friendly and
              easy to use on any devise that use a web browser and almost
              impossible to be hacked
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
                verify your vaccine state or other (other is only for admin )
              </p>
            </div>
            <Link to="/Verifi">
              <div className="button">PRODUCT VERIFICATION</div>
            </Link>
          </div>

          <div className="card">
            <i className="far fa-user"></i>
            <h5>VACCINE STATE</h5>
            <div className="pra">
              <p>
                change the user vaccine state all over the blockchain to Check
                it all over the world
              </p>
              <Link to="/">
                <div className="button">change state</div>
              </Link>
            </div>
          </div>

          <div className="card">
            <i className="far fa-bell"></i>
            <h5>SECURE information</h5>
            <div className="pra">
              <p>
                all of theinformation is SECURE and Save aginst hackers dnd data
                vilations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-me">
        <p>The coronavirus (COVID-19) vaccines are safe and effective.
           They give you the best protection against COVID-19.</p>
        <div className="button-two"><a href="https://www.blockchain.com/">more about the BLOCKCHAIN</a></div>
      </div>

      <footer>
        <p>BLOCKCHAIN is the future </p>

        <p className="end">CopyRight By KSU</p>
      </footer>
    </>
  );
}
