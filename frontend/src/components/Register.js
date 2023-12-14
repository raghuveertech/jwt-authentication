import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { token, setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/myprofile");
    }
  }, [token, navigate]);

  const onChangeHandler = (e) => {
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:5050/register", formData, {
        headers: headers,
      })
      .then((response) => {
        console.log("response", response);
        if (response.data.token) {
          alert("Success");
          setToken(response.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          alert(err.response.data);
        } else {
          alert("Something went wrong. Please try later.");
        }
      });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input
          type={"text"}
          name="name"
          id="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input
          type={"email"}
          name="email"
          id="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input
          type={"password"}
          name="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input
          type={"password"}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input type={"submit"} value="Register" /> <br />
      </form>
    </div>
  );
};

export default Register;
