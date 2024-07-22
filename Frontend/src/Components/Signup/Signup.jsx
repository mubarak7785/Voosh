import { Link } from "react-router-dom";
import "./Signup.css";

import React, { useState } from "react";

export const Signup = () => {
  const [signupdata, setSignupdata] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupdata({ ...signupdata, [id]: value });
  };

  return (
    <div className="signup_container">
      <div className="sign_heading">
        <h2>Signup</h2>
      </div>
      <div className="sign_card">
        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            Name
          </p>
          <input type="text" id="name" onChange={handleChange} />
        </div>
        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            Email
          </p>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            User Name
          </p>
          <input type="text" id="username" onChange={handleChange} />
        </div>
        <div className="sign_inp_div">
          <p className="sign_p" htmlFor="">
            Password
          </p>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="sign_inp_div">
          <button className="sign__btn">Signup</button>
        </div>
        <div className="sign_inp_div">
          <h3>Already have an account? <Link to="/login">Login</Link></h3>
        </div>
      </div>
    </div>
  );
};
