import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  logoutUser,
  selectUser as selectLoggedInUser,
} from "features/authSlice";
import {
  selectError,
  selectPending,
  selectUser,
  getProfile,
} from "features/userSlice";
import { Loading } from "components";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, isAdmin } = useAppSelector(selectLoggedInUser);
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectError);
  const pending = useAppSelector(selectPending);

  useEffect(() => {
    dispatch(getProfile(accessToken));
    if (error.message && error.message.length > 0) {
      console.log("error", error);
      dispatch(logoutUser());
      // navigate("/login");
    }
  }, [accessToken, error, dispatch, navigate]);

  return (
    <>
      {pending && <Loading />}
      <div className='flex flex-col max-w-[50vw] mx-auto'>
        <div>
          <h2 className='font-bold text-[2rem] text-center'>{user.name}</h2>
          <img src={`${process.env.REACT_APP_BASE_URL}/media/images/users/${user.image}`} alt={user.name} className='bg-zinc-400 mx-auto'/>
        </div>

        {isAdmin && <Link to='/dashboard'>Dashboard</Link>}
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
    </>
  );
};

export default Profile;
