import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Navbar } from "../Navbar/Navbar";

export const Login = () => {
  const [logindata, setLogindata] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogindata({ ...logindata, [id]: value });
  };
const navigate=useNavigate()
  const sendData = async (e) => {
    try {
      const response=await fetch("https://voosh-rb1i.onrender.com/user/login", {
        method: "POST",
        body: JSON.stringify(logindata),
        headers: { "content-type": "application/json" },
      })
       console.log(response) 
      const data= await response.json()
      if(response.ok){
        alert(data.message)
        localStorage.setItem('token', data.token);
        navigate("/home")
      }
      else{
        alert(data.message)
      }
      console.log(data)      
    } catch (error) {
      alert("Error");
    }
  };
  return (
    <>
    <Navbar/>

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
          <button onClick={sendData} className="sign__btn">Login</button>
        </div>
        <div className="sign_inp_div">
          <h3>
            Don't have an account? <Link to="/signup">Signup</Link>
          </h3>
        </div>
      </div>
    </div>
    
    </>

  );
};
