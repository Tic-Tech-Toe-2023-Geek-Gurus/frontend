import {Link, useNavigate} from "react-router-dom"
import "../style/Nav.css";
export const Nav = () => {
    const navigate=useNavigate();
    const logout=()=>
    {
        localStorage.clear();
        navigate('/');
    }
    const auth=localStorage.getItem('user');
    return (
        <div className="navbar">
            {auth?<><Link to="/Home"> Home </Link><Link to="/Profile"> Profile </Link><Link onClick={logout}> Logout </Link></>:<><Link to="/"> Home </Link><Link to="/Profile"> Profile </Link><Link to="/signup"> Signup </Link><Link to="/Login"> Login </Link></>}
        </div>    
    )
};