import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
import Profile from "./components/Profile";
import DashboardNav from "./components/DashboardNav";
import MySettings from "./components/MySettings";

export const TokenContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  return (
    <TokenContext.Provider value={{ token: token, setToken: setToken }}>
      <div className="App">
        {token ? <DashboardNav /> : <Nav />}

        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/myprofile" element={<Profile />}></Route>
          <Route path="/mysettings" element={<MySettings />}></Route>
        </Routes>
      </div>
    </TokenContext.Provider>
  );
}

export default App;
