import { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../App";

const Nav = () => {
  const { token, setToken } = useContext(TokenContext);

  console.log("token in Nav Component", token);

  return (
    <div>
      <nav>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/">
          <button>Register</button>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
