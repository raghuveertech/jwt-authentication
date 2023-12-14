import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "../App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { token, setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/myprofile");
    }
  }, [token, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://localhost:5050/signin", formData, {
        headers: headers,
      })
      .then((response) => {
        console.log("response", response.data.token);
        setToken(response.data.token);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong. Please try later.");
        }
      });
  };

  const onChangeHandler = (e) => {
    setFormData((prevValues) => {
      return {
        ...prevValues,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
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
        <input type={"submit"} value="Login" /> <br />
      </form>
    </div>
  );
};

export default Login;
