import React, { useEffect, useState } from "react";
import "./cards.css";

const initialState = { selected: "", selected1: "", selected2: "" };

function Cards(props) {
  const [defaultDesignation, setDefaultDesignation] = useState(initialState);

  useEffect(() => {
    if (props.addEmployeeData.designation == "HR") {
      setDefaultDesignation({ ...defaultDesignation, selected: "selected" });
    } else if (props.addEmployeeData.designation == "Manager") {
      setDefaultDesignation({ ...defaultDesignation, selected1: "selected" });
    } else if (props.addEmployeeData.designation == "Sales") {
      setDefaultDesignation({ ...defaultDesignation, selected2: "selected" });
    }
  }, [props.addEmployeeData]);

  // console.log(props.addEmployeeData.designation);
  return (
    <div className="cardContainer">
      <fieldset>
        <legend>Create Employee</legend>
        <table>
          <tbody>
            <tr>
              <td>Name </td>
              <td>
                <input
                  className="inputCards"
                  value={props.addEmployeeData.name}
                  name="name"
                  onChange={(e) => props.onchangehandler(e)}
                />
              </td>
              <td>
                <span className="errorCards">{props.error.name}</span>
              </td>
            </tr>
            <tr>
              <td>E-mail </td>
              <td>
                <input
                  className="inputCards"
                  value={props.addEmployeeData.email}
                  name="email"
                  onChange={(e) => props.onchangehandler(e)}
                />
              </td>
              <td>
                <span className="errorCards">{props.error.email}</span>
              </td>
            </tr>
            <tr>
              <td>Mobile Number </td>
              <td>
                <input
                  className="inputCards"
                  value={props.addEmployeeData.number}
                  name="number"
                  onChange={(e) => props.onchangehandler(e)}
                />
              </td>
              <td>
                <span className="errorCards">{props.error.number}</span>
              </td>
            </tr>
            {/* {console.log(props.addEmployeeData.designation)} */}

            <tr>
              <td>Designation</td>
              <td>
                <select onClick={(e) => props.selectDesi(e)}>
                  <option>Select</option>
                  <option
                    value="HR"
                    selected={defaultDesignation.selected}
                    name="designation"
                  >
                    HR
                  </option>
                  <option
                    value="Manager"
                    selected={defaultDesignation.selected1}
                    name="designation"
                  >
                    Manager
                  </option>
                  <option
                    value="Sales"
                    selected={defaultDesignation.selected2}
                    name="designation"
                  >
                    Sales
                  </option>
                </select>
              </td>
              <td>
                <span className="errorCards">{props.error.designation}</span>
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => props.onchangehandler(e)}
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => props.onchangehandler(e)}
                />
                Female
              </td>
              <td>
                <span className="errorCards">{props.error.gender}</span>
              </td>
            </tr>
            <tr>
              <td>Course</td>
              <td>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={(e) => props.onchangehandler(e)}
                />
                MCA
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={(e) => props.onchangehandler(e)}
                />
                BCA
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={(e) => props.onchangehandler(e)}
                />
                BSC
              </td>
              <td>
                <span className="errorCards">{props.error.course}</span>
              </td>
            </tr>
            <tr>
              <td>Img Upload</td>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={props.imageChange}
                />
              </td>
              <td>
                <span className="errorCards">{props.error.img}</span>
              </td>
            </tr>
          </tbody>
          {props.name == "addEmployee" && <button>Add</button>}
          {props.name == "editEmployee" && <button>Update</button>}
        </table>
      </fieldset>
    </div>
  );
}

export default Cards;
