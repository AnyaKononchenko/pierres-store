import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getUsers,
  selectError,
  selectPending,
  selectUsers,
} from "features/userSlice";
import { ItemsList, Loading } from "components";
import { logoutUser, selectUser } from "features/authSlice";

const UsersBoard = () => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const users = useAppSelector(selectUsers);
  const { accessToken } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getUsers(accessToken));
    if (error && error.message && error.message.length > 0) {
      toast.error(error.message);
      dispatch(logoutUser());
    }
  }, [dispatch, error, accessToken]);

  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <h2 className='font-bold text-[1.5rem]'>Users</h2>
      {pending && <Loading />}
      {/* <ItemsList items={users} /> */}

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

export default UsersBoard;
