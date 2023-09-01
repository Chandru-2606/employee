import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();
  return (
    <div className="headerContainer">
      <div className="logoContainer"></div>
      <div className="container">
        <a href="#">Home</a>
        <p>Employee List</p>
        <p>Hukum Gupta</p>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="containerName">
        {props.name == "dashboard" && <a href="#">Dashboard</a>}
        {props.name == "AddEmployee" && <h2>Create Employee</h2>}
        {props.name == "editEmployee" && <h2>Edit Employee</h2>}
      </div>
    </div>
  );
}

export default Header;
