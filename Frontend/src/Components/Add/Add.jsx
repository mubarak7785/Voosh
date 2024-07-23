import React, { useState } from "react";
import "./Add.css";
import { Link, useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Navbar2 } from "../Navbar2/Navbar2";
const MySwal = withReactContent(Swal);

export const Add = () => {
  const [post, setPost] = useState();
 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setPost({ ...post, [id]: value });
    console.log(post);
  };

  const navigate = useNavigate();
  const postData = async () => {
    const token2 = localStorage.getItem("token");
    
    try {
      const response = await fetch(
        "https://voosh-rb1i.onrender.com/data/create",
        {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "content-type": "application/json",
            Authorization: token2,
          },
        }
      );

      MySwal.fire(
        "Task Added Successfully!",
        "Please click the button!",
        "success"
      );
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Navbar2/>
      <div className="form">
        <h3>Add Tasks Here !</h3>
        <label htmlFor="">Titel</label>
        <input type="text" id="title" onChange={handleChange} />
        <br />
        <label htmlFor="">Description</label>
        <textarea
          name=""
          id="description"
          cols="30"
          rows="2"
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="">status</label>
        <select name="" id="status" onChange={handleChange}>
          <option value="">Select</option>
          <option value="To-do">To-do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <br />
        <button onClick={postData}>Submit</button>
        <Link to="/home">
          <p>Click here to return to Home</p>
        </Link>
      </div>
    </div>
  );
};
