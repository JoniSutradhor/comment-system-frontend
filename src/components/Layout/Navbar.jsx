import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Comment System
        </Link>

        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/comments" className="nav-link">
                Comments
              </Link>
              <span className="nav-user">Hi, {user?.username}</span>
              <button onClick={logout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
