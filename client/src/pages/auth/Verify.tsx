// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectResponse, verifyUser } from "features/authSlice";
import { Flag } from "assets";
import Error from "pages/handlers/Error";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectResponse);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (response.status === "success") {
      setIsVerified(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    if (response.status === "error") {
      toast.error(response.message);
      setIsVerified(false);
    }
  }, [navigate, dispatch, response.status, response.message]);

  const handleClick = () => {
    dispatch(verifyUser(searchParams.get("token")));
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Account verification</title>
      </Helmet>
      {isVerified && (
        <section className='flex items-center justify-center w-[90vw] lg:w-[30vw] h-[40vh] bg-[#FDC175] border-[#A8824F] border-4 mx-auto my-10 p-4'>
          <p className="text-center">{response.message}</p>
        </section>
      )}
      {searchParams.get("token") && !isVerified && (
        <section className='flex flex-col items-center justify-between w-[90vw] lg:w-[30vw] h-[40vh] bg-[#FDC175] border-[#A8824F] border-4 mx-auto my-10 p-4'>
          <h2 className='font-bold text-[#1C0D25] text-[1.5rem] text-center'>
            You are super close to join Pierre's!
          </h2>
          <img src={Flag} alt='finish mark icon' className='w-[5rem]' />
          <button
            onClick={handleClick}
            className='rounded-md p-2 bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100'
          >
            Verify Email
          </button>
        </section>
      )}
      {!searchParams.get("token") && !isVerified && (
        <Error message='Invalid URL' />
      )}
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

export default Verify;
