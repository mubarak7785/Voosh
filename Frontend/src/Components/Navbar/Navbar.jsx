import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="nav-div">
      <div>
        <h2>Voosh</h2>
      </div>
      <div>
        <Link to="/login">
          <button className="log">Login</button>
        </Link>
        <Link to="/signup">
          <button className="log">Signup</button>
        </Link>
      </div>
    </div>
  );
};
