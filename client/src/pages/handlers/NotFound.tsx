import React from "react";
import { useNavigate } from "react-router-dom";

import { NotFound as NotFoundIcon } from "assets";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className='flex flex-col items-center gap-6 w-[90vw] mx-auto my-10 p-4'>
      <h2 className='text-[1.5rem] text-center font-bold text-zinc-300'>
        Sorry, this page was not found.
      </h2>
      <img
        src={NotFoundIcon}
        alt='not found icon'
        className='w-[90%] md:w-[50%] lg:w-[30%]'
      />
      <button
        onClick={() => {
          navigate("/");
        }}
        className='w-[5rem] rounded-md mt-3 mx-auto p-2 bg-[#c7a16f] text-zinc-800 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100'
      >
        Home
      </button>
    </section>
  );
};

export default NotFound;
