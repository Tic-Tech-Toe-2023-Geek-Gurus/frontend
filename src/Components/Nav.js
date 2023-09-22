import {Link} from "react-router-dom"
import "../style/Nav.css";
export const Nav = () => {
    return (
        <div className="navbar">
        <Link to="/"> Home </Link>
        <Link to="/signup"> Signup </Link>
        <Link to="/Login"> Login </Link>
        </div>    
    )
};