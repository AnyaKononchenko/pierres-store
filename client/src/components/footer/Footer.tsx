import React from "react";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className='flex flex-col gap-4 items-center min-h-[10vh] text-[1.1rem] text-[#FDC175] bg-[#002B39] p-4'>
      <div className='flex flex-col lg:flex-row items-center gap-2 lg:gap-10'>
        <p className="text-center">
          Created by{" "}
          <span className='underline underline-offset-4 decoration-2 decoration-inherit hover:text-[#b48445]'>
            Anna Kononchenko
          </span>{" "}
          in 2023
        </p>
        <div className="flex gap-4">
          <Link to='https://github.com/AnyaKononchenko' target='_blank'>
            <AiFillGithub className='text-[1.5rem] hover:text-[#b48445] ' />
          </Link>

          <Link
            to='http://www.linkedin.com/in/anna-kononchenko'
            target='_blank'
          >
            <AiFillLinkedin className='text-[1.5rem] hover:text-[#b48445]' />
          </Link>
        </div>
      </div>
      <p className='text-center'>
        Content is used under{" "}
        <Link
          to='https://creativecommons.org/licenses/by-nc-sa/3.0/'
          target='_blank'
          className='hover:text-[#b48445]'
        >
          Creative Commons Attribution-NonCommercial-ShareAlike
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
