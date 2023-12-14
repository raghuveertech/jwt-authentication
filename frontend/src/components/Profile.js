import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();
  console.log("token", token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (token) {
      axios
        .get("http://localhost:5050/myprofile", {
          headers: {
            "x-token": token,
          },
        })
        .then((response) => {
          console.log("my profile response", response);
          setUserInfo(response.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, navigate]);

  return (
    <>
      {userInfo && (
        <div>
          <h1>Welcome {userInfo.name}</h1>
          <h2> Your email adress is {userInfo.email} </h2>
        </div>
      )}
    </>
  );
};

export default Profile;
