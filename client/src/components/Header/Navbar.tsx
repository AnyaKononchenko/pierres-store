import { logout } from "features/userSlice";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/store'>Store</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <span onClick={handleLogout}>Logout</span>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
