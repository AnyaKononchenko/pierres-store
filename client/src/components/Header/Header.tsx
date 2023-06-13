import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className='flex justify-between items-center h-20 py-2 px-8 lg:px-20 font-gothic bg-[#1C0D25]'>
      <div className='relative p-3 z-20'>
        <Link to='/'>
          <p className='font-sigmar text-[1.5rem] lg:block hidden text-[#FDC175]'>
            Pierre's General Store
          </p>
          <p className='font-sigmar text-[1.8rem] lg:hidden block text-[#FDC175] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Pierre's</p>
          <p className='font-sigmar text-sm absolute right-[-.5rem] bottom-[.1rem] text-[#FDC175] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{`<Corporation>`}</p>
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
