import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppDispatch } from "redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { forgottenPassword } from "features/authSlice";

const ForgottenPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordRecovery = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(forgottenPassword(email));
    toast.info('A password recovery link was sent to your email.')
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Password Recovery</title>
      </Helmet>
      <section className='flex flex-col gap-4 w-[90vw] mx-auto my-8 p-4'>
        <h2 className='font-bold text-zinc-300 text-[1.5rem] text-center'>
          Password Recovery
        </h2>
        <form
          onSubmit={handlePasswordRecovery}
          className='flex flex-col gap-4 w-full lg:w-[30vw] bg-[#FDC175] border-[#A8824F] border-4 mx-auto p-4'
        >
          <div className='flex gap-2 flex-wrap items-center my-2'>
            <label htmlFor='email' className='w-fit'>
              Email:
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              className='bg-inherit border-b-[#A8824F] border-b-4 w-full'
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
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </HelmetProvider>
  );
};

export default ForgottenPassword;
