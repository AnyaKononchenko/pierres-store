// @ts-nocheck
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowBack } from "react-icons/ti";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getUsers,
  selectResponse,
  selectPending,
  selectUsers,
} from "features/userSlice";
import { ItemsList, Loading } from "components";
import { selectUser } from "features/authSlice";
import { ItemType } from "@customTypes/common";
import { useNavigate } from "react-router-dom";

const UsersBoard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);
  const users = useAppSelector(selectUsers);
  const { accessToken } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getUsers(accessToken));
    if (response.status === "error") {
      toast.error(response.message);
    }
  }, [dispatch, accessToken, response.status, response.message]);

  const handleDelete = (item: ItemType) => {
    console.log("Delete user");
  };

  return (
    <>
      {pending && <Loading />}
      <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] w-[90vw]'>
        <div className='relative flex items-center justify-center w-full'>
          <button className='absolute left-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50' onClick={() => navigate('/dashboard')}><TiArrowBack /></button>
          <h2 className='font-bold text-[1.5rem] text-zinc-300 '>Community</h2>
        </div>
        <ItemsList items={users} onDelete={handleDelete} />
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
    </>
  );
};

export default UsersBoard;
