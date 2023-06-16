import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "redux/hooks";
import { recoverPassword } from "features/authSlice";

const RecoverPassword = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordRecovery = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(searchParams.get("token"));
    console.log(password);
    dispatch(recoverPassword({ token: searchParams.get("token"), password }));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Recover Password</title>
      </Helmet>
      <section>
        <h2 className='font-bold text-zinc-300 text-[1.5rem] text-center my-6'>
          Password Recovery
        </h2>
        <form
          onSubmit={handlePasswordRecovery}
          className='flex flex-col gap-4 w-full lg:w-[30vw] bg-[#FDC175] border-[#A8824F] border-4 mx-auto p-4'
        >
          <div className='flex gap-2 justify-center items-center my-2 '>
            <label htmlFor='password'>New Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              className='bg-inherit border-b-[#A8824F] border-b-4'
            />
          </div>
          <button
            type='submit'
            className='rounded-md mt-3 mx-auto p-2 bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100'
          >
            Recover Password
          </button>
        </form>
      </section>
    </HelmetProvider>
  );
};

export default RecoverPassword;
