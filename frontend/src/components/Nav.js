import { Link } from "react-router-dom";

const Nav = () => {
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
