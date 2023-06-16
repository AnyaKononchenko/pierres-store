import React from "react";

import { UnderConstruction as UnderConstructionIcon } from "assets";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();
  return (
    <section className='flex flex-col items-center gap-6 w-[90vw] mx-auto my-10 p-4'>
      <h2 className='text-[1.5rem] text-center font-bold text-zinc-300'>
        This page is currently under construction.
      </h2>
      <img
        src={UnderConstructionIcon}
        alt='under construction icon'
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

export default UnderConstruction;
