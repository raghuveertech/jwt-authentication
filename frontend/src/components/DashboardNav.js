import { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../App";

const DashboardNav = () => {
  const { setToken } = useContext(TokenContext);

  const logoutUser = () => {
    setToken(null);
  };

  return (
    <div>
      <nav>
        <Link to="/myprofile">
          <button>My Profile</button>
        </Link>
        <Link to="/mysettings">
          <button>My Settings</button>
        </Link>

        <button onClick={logoutUser}>Logout</button>
      </nav>
    </div>
  );
};

export default DashboardNav;
