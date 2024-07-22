import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="nav-div">
      <div>
        <Link to="/home"><h2 className="voosh">Voosh</h2></Link>
        
      </div>
      <div>
        <Link to="/">
          <button className="log">Login</button>
        </Link>
        <Link to="/signup">
          <button className="log">Signup</button>
        </Link>
      </div>
    </div>
  );
};
