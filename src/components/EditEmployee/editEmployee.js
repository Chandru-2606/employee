import React, { useEffect, useState } from "react";
import Cards from "../Cards/cards";
import { useParams, useNavigate } from "react-router-dom";
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
function EditEmployee() {
  const [addEmployeeData, setAddEmployeeData] = useState(initialState);
  const [error, setError] = useState({});

  let { id } = useParams();
  let navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const regexExp = /^[6-9]\d{9}$/;
  let arr = JSON.parse(localStorage.getItem("addEmployee"));

  useEffect(() => {
    arr.map((item) => {
      if (item.id == id) {
        console.log(item);
        setAddEmployeeData({
          ...addEmployeeData,
          name: item.name,
          email: item.email,
          number: item.number,
          gender: item.gender,
          course: item.course,
          designation: item.designation,
          id: item.id,
          date: item.date,
          img: item.img,
        });
      }
    });
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
    setError(validate(addEmployeeData));
    let updatedEmployee = addEmployeeData;
    if (
      addEmployeeData.name !== "" &&
      addEmployeeData.name.length >= 5 &&
      addEmployeeData.email !== "" &&
      emailRegex.test(addEmployeeData.email) &&
      addEmployeeData.number !== "" &&
      regexExp.test(addEmployeeData.number) &&
      addEmployeeData.designation !== "" &&
      addEmployeeData.gender !== "" &&
      addEmployeeData.course !== ""
    ) {
      let objIndex = arr.findIndex((obj) => obj.id == id);
      arr[objIndex] = updatedEmployee;
      localStorage.setItem("addEmployee", JSON.stringify(arr));
      navigate("/dashboard");
    } else {
      console.log(false);
    }
  };
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
    return errors;
  };
  const coursecheck = (e) => {
    setAddEmployeeData({ ...addEmployeeData, course: e.target.value });
  };
  const imageChange = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setAddEmployeeData({ ...addEmployeeData, img: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };
  return (
    <div>
      <Header name="editEmployee" />
      <form onSubmit={handleSubmit}>
        <Cards
          name="editEmployee"
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

export default EditEmployee;
