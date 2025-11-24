import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/books">All Books</NavLink>

      {user.id ? (
        // Logged-in view
        <span>
          <NavLink to="/account">Account</NavLink>
          <a
            onClick={() => {
              logout();
            }}
          >
            Logout
          </a>
        </span>
      ) : (
        // Guest view
        <span>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
