import React from "react";
import useAuth from "../hooks/useAuth";
import Nav from "./Nav";
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
          <h3> VACCINE VERIFICATION SYSTEM</h3>
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
              ens ure the authenticity and validity of the data using the
              blockchain techn ology and keeping in mind being user friendly and
              easy to use on any devise that use a w eb browser and almost
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
            <h5>VACCINE VERIFICATION </h5>
            <div className="pra">
              <p>
                Every website should be built with two primary goals: Firstly,
                it needs to work across all devices. Secondly, it needs to be
                fast as possible.
              </p>
            </div>
            <div className="button">VACCINE VERIFICATION</div>
          </div>

          <div className="card">
            <i className="far fa-user"></i>
            <h5>VACCINE STATE</h5>
            <div className="pra">
              <p>
                Every website should b builto work across all devist as
                possible.
              </p>
              <div className="button">change state</div>
            </div>
          </div>

          <div className="card">
            <i className="far fa-bell"></i>
            <h5>SECURE information</h5>
            <div className="pra">
              <p>Esecure information lt with two primarork acrble.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-me">
        <p>Let Me Get You A Beautiful Website.</p>
        <div className="button-two">Hire Me</div>
      </div>

      <footer>
        <p>BLOCKCHAIN is the future </p>

        {/* <div className="social">
			<a href="#"><i className="fab fa-facebook-f"></i></a>
			<a href="#"><i className="fab fa-instagram"></i></a>
			<a href="#"><i className="fab fa-dribbble"></i></a>
		</div> */}
        <p className="end">CopyRight By KSU</p>
      </footer>
    </>
  );
}
