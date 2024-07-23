import React from "react";
import "./Navbar2.css";
import { Link, useNavigate } from "react-router-dom";

export const Navbar2 = () => {
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("You have been logged out.")
    navigate("/");
  };

  return (
    <div className="nav-div2">
      <div>
        <Link to="/home">
          <h2 className="voosh2">Voosh</h2>
        </Link>
      </div>
      <div className="nav-right">
        <h3 className="log2">{userName}</h3>
        <button onClick={logout} className="log2">
          Logout
        </button>
      </div>
    </div>
  );
};
