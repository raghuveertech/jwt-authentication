import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

const MySettings = () => {
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>My Settings</h1>
    </div>
  );
};

export default MySettings;
