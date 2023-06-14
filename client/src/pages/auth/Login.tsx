import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login as LoginState } from "@customTypes/users";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  loginUser,
  selectResponse,
  selectPending,
} from "../../features/authSlice";
import { Loading } from "components";
import { LoginVariant } from "@customTypes/common";

const Login = ({ variant }: { variant: LoginVariant}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);

  const [loginData, setLoginData] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser(loginData));
    !pending && navigate("/profile");
  };

  useEffect(() => {
    if (response.status === "error") {
      response.statusCode !== 403 && toast.error(response.message);
    }
  }, [dispatch, response.message, response.status, response.statusCode]);

  return (
    <div className='px-3'>
      <Helmet>
        <title>Login To Pierre's</title>
      </Helmet>
      {pending && <Loading />}
      <div className='w-[90vw] md:w-[60vw] lg:w-[40vw] my-16 text-[1.2rem]'>
        <h1 className='font-bold text-[1.8rem] text-center mb-6 text-zinc-300'>
          {`${variant === LoginVariant.regular ? "Log in to expore Pierre's!" : "Log in first to proceed :)"}`}
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-5 p-10 bg-[#FDC175] border-[#A8824F] border-4'
        >
          <div className='flex'>
            <label className='w-1/4'>Email:</label>
            <input
              type='email'
              name='email'
              value={loginData.email}
              onChange={handleInputChange}
              required
              className='bg-inherit border-b-[#A8824F] border-b-4 w-3/4'
            />
          </div>
          <div className='flex'>
            <label className='w-1/4'>Password:</label>
            <input
              type='password'
              name='password'
              value={loginData.password}
              onChange={handleInputChange}
              required
              className='bg-inherit border-b-[#A8824F] border-b-4 w-3/4'
            />
          </div>
          <Link to='/forgotten-password' className='text-sm mx-auto'>
            Forgotten Password?
          </Link>
          <button
            type='submit'
            className='w-[40%] rounded-md mt-3 mx-auto p-2 bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100'
          >
            Login
          </button>
        </form>
        <Link to='/signup'>Not a member? Sign Up</Link>
      </div>
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
    </div>
  );
};

export default Login;
