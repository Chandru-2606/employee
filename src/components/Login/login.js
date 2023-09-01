import React, { useState } from "react";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./login.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [loginData, setLoginData] = useState(initialState);
  const [error, setError] = useState({});
  const [errorDisplay, setErrorDisplay] = useState("");

  let navigate = useNavigate();
  const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

  const onchangehandler = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    setError(validate(loginData));

    if (
      loginData.email == "hukumgupta@gmail.com" &&
      loginData.password == "hukumgupta"
    ) {
      return navigate("./dashboard");
    } else if (loginData.email !== "" && loginData.password !== "") {
      setErrorDisplay("Email - hukumgupta@gmail.com Password -hukumgupta");
    }
  };
  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = " Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This email is not Valid email";
    }

    if (!values.password) {
      errors.password = " Password is required";
    }
    return errors;
  };
  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <Input
          size="large"
          placeholder="Email"
          name="email"
          value={loginData.email}
          prefix={<UserOutlined />}
          onChange={(e) => onchangehandler(e)}
        />
        <br />
        <span className="errorSpan">{error.email}</span>
        <span className="errorSpan">{errorDisplay}</span>
        <Input.Password
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={(e) => onchangehandler(e)}
        />
        <span className="errorSpan">{error.password}</span>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
