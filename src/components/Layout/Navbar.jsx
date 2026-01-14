import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("User authentication status changed:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      {isAuthenticated ? (
        <>
          <Link to="/comments">Comments</Link>

          <span>Hi, {user?.username}</span>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
