import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logoutUser, selectIsLoggedIn, selectUser } from "features/authSlice";
import { selectCart } from "features/cartSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [navOpen, setNavOpen] = useState<boolean>(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const cart = useAppSelector(selectCart)

  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());

    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <nav className='flex items-center gap-5'>
      <ul className='hidden lg:flex text-zinc-400 text-[1.1rem] '>
        <li className='p-4 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#FDC175]'>
          <Link to='/'>Home</Link>
        </li>
        <li className='p-4 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#FDC175]'>
          <Link to='/store'>Store</Link>
        </li>
        <li className='p-4 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#FDC175]'>
          <Link to='/profile'>Profile</Link>
        </li>
        <li className='p-4 hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#FDC175]'>
          <Link to='/cart'>{isLoggedIn ? `Cart (${cart.length})`: 'Cart'}</Link>
        </li>
        <li className='p-4  hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-[#FDC175]'>
          <Link to='/cart'>Partners</Link>
        </li>
        {user.isAdmin && (
          <li className='p-4 hover: underline hover:underline-offset-2 hover:decoration-2 hover:decoration-[#FDC175]'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        )}
      </ul>

      {isLoggedIn ? (
        <Link to='#' onClick={handleLogout}>
          <div className='flex justify-center items-center text-zinc-400 text-[1.2rem]'>
            <AiOutlineLogout size={20} />
            <span className='ml-1'>Logout</span>
          </div>
        </Link>
      ) : (
        <Link to='/login'>
          <div className='flex justify-center items-center p-2 text-zinc-400 text-[1.2rem]'>
            <BiUserCircle size={20} />
            <span className='ml-1'>Login</span>
          </div>
        </Link>
      )}

      <div
        className='lg:hidden block text-zinc-400 hover:cursor-pointer'
        onClick={handleNavOpen}
      >
        {navOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      {/* mobile menu */}
      <div
        className={`fixed top-0 ${
          navOpen ? "left-0 " : "left-[-100%] "
        } w-[70%] p-4 h-full border-r border-r-gray-500 bg-zinc-400 ease-out duration-300 z-10`}
      >
        <ul className='flex flex-col gap-4 pt-24 uppercase '>
          <Link to='/' onClick={() => handleNavOpen()}>
            <li className='p-4 basic-panel'>Home</li>
          </Link>
          <Link to='/store' onClick={() => handleNavOpen()}>
            <li className='p-4 basic-panel'>Store</li>
          </Link>
          <Link to='/profile' onClick={() => handleNavOpen()}>
            <li className='p-4 basic-panel'>Profile</li>
          </Link>
          <Link to='/cart' onClick={() => handleNavOpen()}>
            <li className='p-4 basic-panel'>{isLoggedIn ? `Cart (${cart.length})`: 'Cart'}</li>
          </Link>
          <Link to='/cart' onClick={() => handleNavOpen()}>
            <li className='p-4 basic-panel'>Partners</li>
          </Link>
          {user.isAdmin && (
            <Link to='/dashboard' onClick={() => handleNavOpen()}>
              <li className='p-4 basic-panel'>Dashboard</li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
