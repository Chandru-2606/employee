import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Header from "../Header/header";

function Dashboard() {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState();
  const [copyData, setCopyData] = useState();
  const [count, setCount] = useState(0);

  const moment = require("moment");

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("addEmployee"));
    setCount(a && a.length);
    setEmployee(a);
    setCopyData(a);
  }, []);
  const Delete = (id) => {
    let deleteText = employee.filter((find) => find.id !== id);
    localStorage.setItem("addEmployee", JSON.stringify(deleteText));
    setEmployee(deleteText);
  };

  const searchFunc = (e) => {
    const filterArray = copyData.filter((items) => {
      return (
        items.name.toLowerCase().includes(e.toLowerCase()) ||
        items.email.toLowerCase().includes(e.toLowerCase()) ||
        items.gender.toLowerCase().includes(e.toLowerCase()) ||
        items.designation.toLowerCase().includes(e.toLowerCase()) ||
        items.number.includes(e) ||
        items.id.includes(e)
      );
    });
    setEmployee(filterArray);
    console.log(filterArray);
  };
  return (
    <div>
      <Header name="dashboard" />
      <div className="dashboardContainer">
        <div className="totalContainer">
          <div className="dummyContainer"></div>
          <div className="count">
            <p>
              Total Count : <span>{count}</span>
            </p>
            <button
              onClick={() => {
                navigate("/addemployee");
              }}
            >
              Create Employee
            </button>
          </div>
        </div>
        <div>
          <div className="totalContainer">
            <div className="dummyContainer"></div>
            <div className="count">
              <p>Search Keyword</p>
              <input
                onChange={(e) => {
                  searchFunc(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="headingTable">
          <table>
            <tr>
              <th>Unique id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </table>
        </div>
        <div className="dataTable">
          <table>
            {employee &&
              employee.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      {" "}
                      <img src={item.img} />
                    </td>
                    <td>{item.name}</td>
                    <td id="email">{item.email}</td>
                    <td>{item.number}</td>
                    <td>{item.designation}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    <td>{moment(item.date).format(" DD-MMMM-YYYY")}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate(`/editemployee/${item.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Delete(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
