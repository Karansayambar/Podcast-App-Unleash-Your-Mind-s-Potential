import { Link, useLocation } from "react-router-dom";
import "./style.css" ;
function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <div className="navbar">
        <div className="gradient"></div>
        <div className="links">
            <Link to={"/"} className = { currentPath === "/" ? "active" : ""}>Signup</Link>
            <Link to={"/podcasts"} className = {currentPath === "/podcast" ? "active" : ""}>Podcast</Link>
            <Link to={"/start-a-podcast"} className = {currentPath === "/create-a-podcast" ? "active" : ""}>Create-A-Podcast</Link>
            <Link to={"/profile"} className = {currentPath === "/profile" ? "active" : ""}>Profile</Link>
        </div>
    </div>
  )
}
export default Header