import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logoutUser, selectIsLoggedIn, selectUser } from "features/authSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState<boolean>(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());

    setTimeout(() => {
      navigate("/");
    }, 100)
  };

  return (
    <nav className='flex items-center gap-5'>
      <ul className='hidden lg:flex'>
        <li className='p-4'>
          <Link to='/'>Home</Link>
        </li>
        <li className='p-4'>
          <Link to='/store'>Store</Link>
        </li>
        <li className='p-4'>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='p-4'>
          <Link to='/cart'>Cart</Link>
        </li>
        <li className='p-4'>
          <Link to='/cart'>Partners</Link>
        </li>
        {user.isAdmin && (
          <li className='p-4'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        )}
      </ul>

      {isLoggedIn ? (
        <Link to='#' onClick={handleLogout}>
          <div className='flex justify-center items-center'>
            <AiOutlineLogout size={20} />
            <span className='ml-1 text-[1.1rem]'>Logout</span>
          </div>
        </Link>
      ) : (
        <Link to='/login'>
          <div className='flex justify-center items-center'>
            <BiUserCircle size={20} />
            <span className='ml-1 text-[1.1rem]'>Login</span>
          </div>
        </Link>
      )}

      <div
        className='lg:hidden block hover:cursor-pointer'
        onClick={handleNavOpen}
      >
        {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* mobile menu */}
      <div
        className={`fixed top-0 ${
          navOpen ? "left-0 " : "left-[-100%] "
        } w-[70%] h-full border-r border-r-gray-500 bg-slate-500 ease-out duration-300 z-10`}
      >
        <ul className='flex flex-col pt-24 uppercase '>
          <li className='p-4'>
            <Link to='/' onClick={() => handleNavOpen()}>
              Home
            </Link>
          </li>
          <li className='p-4'>
            <Link to='/store' onClick={() => handleNavOpen()}>
              Store
            </Link>
          </li>
          <li className='p-4'>
            <Link to='/profile' onClick={() => handleNavOpen()}>
              Profile
            </Link>
          </li>
          <li className='p-4'>
            <Link to='/cart' onClick={() => handleNavOpen()}>
              Cart
            </Link>
          </li>
          <li className='p-4'>
            <Link to='/cart' onClick={() => handleNavOpen()}>
              Partners
            </Link>
          </li>
          {user.isAdmin && (
            <li className='p-4'>
              <Link to='/dashboard' onClick={() => handleNavOpen()}>
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
