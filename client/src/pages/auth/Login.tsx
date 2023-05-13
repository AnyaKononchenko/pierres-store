import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Login as LoginState } from "@customTypes/users";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  loginUser,
  selectError,
  selectPending,
} from "../../features/authSlice";
import { Loading } from "components";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);

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
    navigate('/profile')
  };

  useEffect(() => {
    error && error.message.length > 0 && toast.error(error.message)
  }, [error, dispatch])

  return (
    <div>
      <Helmet>
        <title>Login To Pierre's</title>
      </Helmet>
      {pending && <Loading />}
      <div className='max-w-[40rem] my-16 mx-auto text-[1.2rem]'>
        <h1 className='font-bold text-[1.8rem] text-center mb-6'>
          Login to expore Pierre's!
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-5 p-10 border border-zinc-600 rounded-md'
        >
          <div className='flex'>
            <label className='w-1/4'>Email:</label>
            <input
              type='email'
              name='email'
              value={loginData.email}
              onChange={handleInputChange}
              required
              className='border-b border-b-zinc-900 w-3/4'
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
              className='border-b border-b-zinc-900 w-3/4'
            />
          </div>
          <button
            type='submit'
            className='bg-slate-500 w-[40%] rounded-md mt-3 mx-auto p-2 hover:bg-slate-200 ease-in duration-150'
          >
            Login
          </button>
        </form>
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
