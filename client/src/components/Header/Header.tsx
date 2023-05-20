import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className='flex justify-between items-center h-20 py-2 px-8 lg:px-20 font-gothic'>
      <div className='relative p-3 z-20'>
        <Link to='/'>
          <p className='font-sigmar text-[1.5rem] lg:block hidden'>
            Pierre's General Store
          </p>
          <p className='font-sigmar text-[1.5rem] lg:hidden block'>Pierre's</p>
          <p className='font-sigmar text-sm absolute right-[-.5rem] bottom-[.1rem]'>{`<Corporation>`}</p>
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
