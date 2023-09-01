import React, { useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import Cards from "../Cards/cards";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
let initialState = {
  name: "",
  email: "",
  number: "",
  gender: "",
  course: "",
  img: "",
  designation: "",
  id: "",
  date: "",
};
function AddEmployee() {
  const [addEmployeeData, setAddEmployeeData] = useState(initialState);
  const [error, setError] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [image, setImage] = useState("");
  const [employeeData, setEmployeeData] = useState();

  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const regexExp = /^[6-9]\d{9}$/;
  const moment = require("moment");
  let navigate = useNavigate();

  useEffect(() => {
    let momentDate = moment(startDate).valueOf();
    const uid = new ShortUniqueId({
      dictionary: "number",
      length: 2,
    });
    setAddEmployeeData({ ...addEmployeeData, id: uid(), date: momentDate });
  }, []);
  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("addEmployee"));
    setEmployeeData(a);
  }, []);

  const onchangehandler = (e) => {
    let { name, value } = e.target;
    setAddEmployeeData({ ...addEmployeeData, [name]: value });
  };
  const selectDesi = (e) => {
    setAddEmployeeData({ ...addEmployeeData, designation: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addEmployeeData);
    setError(validate(addEmployeeData));
    let data = addEmployeeData;
    const employeeReceived = localStorage.getItem("addEmployee");

    if (
      addEmployeeData.name !== "" &&
      addEmployeeData.name.length >= 5 &&
      addEmployeeData.email !== "" &&
      emailRegex.test(addEmployeeData.email) &&
      addEmployeeData.number !== "" &&
      regexExp.test(addEmployeeData.number) &&
      addEmployeeData.designation !== "" &&
      addEmployeeData.gender !== "" &&
      addEmployeeData.course !== "" &&
      addEmployeeData.img !== ""
    ) {
      if (employeeReceived == null) {
        localStorage.setItem("addEmployee", JSON.stringify([data]));
      } else {
        let newData = JSON.parse(employeeReceived);
        console.log(newData);
        newData.unshift(addEmployeeData);
        localStorage.setItem("addEmployee", JSON.stringify(newData));
      }
      navigate("/dashboard");
    } else {
      // console.log(false);
    }
  };
  const coursecheck = (e) => {
    setAddEmployeeData({ ...addEmployeeData, course: e.target.value });
  };
  const imageChange = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      setAddEmployeeData({ ...addEmployeeData, img: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };
//   Validation 
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 5) {
      errors.name = "length need to be greter than 5";
    }

    if (!values.email) {
      errors.email = " Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This email is not Valid email";
    }

    if (!values.number) {
      errors.number = " Number is required";
    } else if (isNaN(values.number)) {
      errors.number = "Enter Only Number";
    } else if (values.number.length !== 10) {
      errors.number = "Enter 10 digits";
    } else if (!regexExp.test(values.number)) {
      errors.number = "This number is not Valid number";
    }

    if (!values.designation || values.designation === "select") {
      errors.designation = "Select the Designation";
    }

    if (!values.gender) {
      errors.gender = "Select the Gender";
    }

    if (!values.course) {
      errors.course = "Select the Course";
    }
    if (!values.img) {
      errors.img = "Please Upload Image";
    }
    return errors;
  };
  return (
    <div>
      <Header name="AddEmployee" />
      <form onSubmit={handleSubmit}>
        <Cards
          name="addEmployee"
          addEmployeeData={addEmployeeData}
          setAddEmployeeData={setAddEmployeeData}
          onchangehandler={onchangehandler}
          error={error}
          selectDesi={selectDesi}
          coursecheck={coursecheck}
          imageChange={imageChange}
        />
      </form>
    </div>
  );
}

export default AddEmployee;
