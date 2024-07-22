import { Link } from "react-router-dom";

import React, { useState } from "react";

export const Login = () => {
  const [logindata, setLogindata] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogindata({ ...logindata, [id]: value });
  };

  const sendData=async (e)=>{
    await fetch("https://")
  }

  return (
    <div className="signup_container">
      <div className="sign_heading">
        <h2>Login</h2>
      </div>
      <div className="sign_card">
        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            Email or Username
          </p>
          <input type="email" id="emailOrUsername" onChange={handleChange} />
        </div>

        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            Password
          </p>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="sign_inp_div">
          <button onClick={sendData} className="sign__btn">Signup</button>
        </div>
        <div className="sign_inp_div">
          <h3>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};
