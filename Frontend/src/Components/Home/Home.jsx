import React, { useEffect, useState } from "react";
import "./Home.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { Navbar2 } from "../Navbar2/Navbar2";

const MySwal = withReactContent(Swal);

export const Home = () => {
  const [data, setData] = useState([]);
  const [editeddata, setEditeddata] = useState({});
  const [toDoData, setToDoData] = useState([]);
  const [doingData, setDoingData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [btn, setBtn] = useState(false);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState();

  useEffect(() => {
    const token2 = localStorage.getItem("token");
    setToken(token2);
    fetchData(token2);
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch("https://voosh-rb1i.onrender.com/data/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const fetchedData = await response.json();
      setData(fetchedData);
      categorizeData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const categorizeData = (data) => {
    const toDo = data.filter((elem) => elem.status === "To-do");
    const doing = data.filter((elem) => elem.status === "Doing");
    const done = data.filter((elem) => elem.status === "Done");

    setToDoData(toDo);
    console.log(toDoData)
    setDoingData(doing);
    setDoneData(done);
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditeddata({ ...editeddata, [id]: value });
  };

  const handleEdit = (id) => {
    setBtn(!btn);
    if (btn === true) {
      updateTask(id, editeddata);
    } else {
      setEditeddata({ id: id });
    }
  };

  const updateTask = async (id, editeddata) => {
    try {
      await fetch(`https://voosh-rb1i.onrender.com/data/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(editeddata),
      });
      MySwal.fire("Task has been Updated!", "Please click the button!", "success");
      fetchData(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (delId) => {
    try {
      await fetch(`https://kanban-task-z27k.onrender.com/data/${delId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      MySwal.fire("Task has been Deleted!", "Please click the button!", "success");
      fetchData(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeStatus = async (satId, event) => {
    try {
      const newStatus = event.target.value;
      setStatus(newStatus);
      const obj = { status: newStatus };
      await fetch(`https://kanban-task-z27k.onrender.com/data/${satId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      MySwal.fire("Status has been updated!", "Please click the button!", "success");
      setStatus({});
      fetchData(token);
    } catch (e) {
      console.log(e);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <Navbar2 />
      <div className="nav-btn">
        <Link to="/add">
          <button className="task_btn">Add Task</button>
        </Link>
      </div>
      <div className="container">
        <div className="to-do">
          <h2>To-Do</h2>
          <div>
            {toDoData.length === 0 ? (
              <h3>You have not added any task in To-Do</h3>
            ) : (
              toDoData.map((e) => (
                <div className="card" key={e._id}>
                  {btn && e._id === editeddata.id ? (
                    <input
                      type="text"
                      onChange={(e) => handleEditChange(e)}
                      id="title"
                      value={e._id === editeddata.id ? editeddata.title || e.title : e.title}
                    />
                  ) : (
                    <h3>Title: {e.title}</h3>
                  )}
                  {btn && e._id === editeddata.id ? (
                    <textarea
                      id="description"
                      cols="40"
                      rows="2"
                      value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                      onChange={handleEditChange}
                    ></textarea>
                  ) : (
                    <p>Description: {e.description}</p>
                  )}
                  <p>Status: {e.status}</p>
                  <p>Created at: {formatDate(e.createdAt)}</p>
                  <select onChange={(event) => handleChangeStatus(e._id, event)} value={status}>
                    <option value="">Select</option>
                    <option value="To-do">To-do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={() => handleEdit(e._id)}>
                    {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
                  </button>
                  <button className="del" onClick={() => handleDelete(e._id)}>Delete task</button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="doing">
          <h2>Doing</h2>
          <div>
            {doingData.length === 0 ? (
              <h3>You have not added any task in Doing</h3>
            ) : (
              doingData.map((e) => (
                <div className="card" key={e._id}>
                  {btn && e._id === editeddata.id ? (
                    <input
                      type="text"
                      onChange={(e) => handleEditChange(e)}
                      id="title"
                      value={e._id === editeddata.id ? editeddata.title || e.title : e.title}
                    />
                  ) : (
                    <h3>Title: {e.title}</h3>
                  )}
                  {btn && e._id === editeddata.id ? (
                    <textarea
                      id="description"
                      cols="40"
                      rows="2"
                      value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                      onChange={handleEditChange}
                    ></textarea>
                  ) : (
                    <p>Description: {e.description}</p>
                  )}
                  <p>Status: {e.status}</p>
                  <p>Created at: {formatDate(e.createdAt)}</p>
                  <select onChange={(event) => handleChangeStatus(e._id, event)} value={status}>
                    <option value="">Select</option>
                    <option value="To-do">To-do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={() => handleEdit(e._id)}>
                    {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
                  </button>
                  <button className="del" onClick={() => handleDelete(e._id)}>Delete task</button>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="done">
          <h2>Done</h2>
          <div>
            {doneData.length === 0 ? (
              <h3>You have not added any task in Done</h3>
            ) : (
              doneData.map((e) => (
                <div className="card" key={e._id}>
                  {btn && e._id === editeddata.id ? (
                    <input
                      type="text"
                      onChange={(e) => handleEditChange(e)}
                      id="title"
                      value={e._id === editeddata.id ? editeddata.title || e.title : e.title}
                    />
                  ) : (
                    <h3>Title: {e.title}</h3>
                  )}
                  {btn && e._id === editeddata.id ? (
                    <textarea
                      id="description"
                      cols="40"
                      rows="2"
                      value={e._id === editeddata.id ? editeddata.description || e.description : e.description}
                      onChange={handleEditChange}
                    ></textarea>
                  ) : (
                    <p>Description: {e.description}</p>
                  )}
                  <p>Status: {e.status}</p>
                  <p>Created at: {formatDate(e.createdAt)}</p>
                  <select onChange={(event) => handleChangeStatus(e._id, event)} value={status}>
                    <option value="">Select</option>
                    <option value="To-do">To-do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                  </select>
                  <button onClick={() => handleEdit(e._id)}>
                    {btn && e._id === editeddata.id ? "Save" : "Edit Task"}
                  </button>
                  <button className="del" onClick={() => handleDelete(e._id)}>Delete task</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
