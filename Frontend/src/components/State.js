import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";

export default function Verifi() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [state, setState] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    console.log(errMsg);
  }, [errMsg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post", //you can set what request you want to be
      url: "http://127.0.0.1:5000/blockchain/create_contract",
      data: {
        id_code: user,
        is_vaccinated: state
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));

    //   axios
    //     .post(
    //       "/blockchain/verify-contract",
    //       {
    //         contract_address:"0xbfB907F863dcF02B1369C9678827b7645dc02CcA"
    //       },
    //       {headers: {"Access-Control-Allow-Origin": "*"} }

    //     )
    //     .then(function (response) {
    //       console.log(response);

    //     }).catch(err=>
    //       {console.log("error msg ",err)
    //       console.log(err);
    //       if (!err?.response) {
    //         setErrMsg("No Server Response");
    //       } else if (err.response?.status === 400) {
    //         setErrMsg("Missing Username");
    //       } else if (err.response?.status === 401) {
    //         setErrMsg("rong information");
    //       } else {
    //         setErrMsg("Failed");
    //       }
    //     });
  };
  return (
    <section className="blur-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>VACCINE STATE</h1>

        {errMsg && <h1>{errMsg}</h1>}

        <label htmlFor="username">VACCINE Code</label>
        <input
          type="text"
          id="state"
          onChange={(e) => setUser(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          value={user}
        ></input>
        <label class="switch" >
          <input
            type="checkbox"
            id="state"
            onChange={(e) => setState(e.target.value)}
            autoComplete="off"
            required
          ></input>
          <span class="slider round"></span>
        </label>

        <button> Change STATE </button>
      </form>
    </section>
  );
}
