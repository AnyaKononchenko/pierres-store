import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { recoverPassword, selectResponse } from "features/authSlice";

const RecoverPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectResponse);
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    (response.message && response.message.length > 0) && toast.success(response.message);
    if(response.status === 'success'){
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
  }, [navigate, response.message, response.status])
  

  const handlePasswordRecovery = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(recoverPassword({ token: searchParams.get("token"), password }));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Recover Password</title>
      </Helmet>
      <section className="w-[90vw] sm:w-[70vw] mx-auto">
        <h2 className='font-bold text-zinc-300 text-[1.5rem] text-center my-6'>
          Password Recovery
        </h2>
        <form
          onSubmit={handlePasswordRecovery}
          className='flex flex-col gap-4 w-full lg:w-[30vw] bg-[#FDC175] border-[#A8824F] border-4 mx-auto p-4'
        >
          <div className='flex flex-wrap gap-2 items-center my-2 '>
            <label htmlFor='password' className="w-fit">New Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
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

export default RecoverPassword;
