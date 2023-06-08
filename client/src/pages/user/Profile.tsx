// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

import ProfilePlaceholder from "../../assets/userProfile-placeholder.png";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  logoutUser,
  selectUser as selectLoggedInUser,
} from "features/authSlice";
import {
  selectResponse,
  selectPending,
  selectUser,
  getProfile,
  updateUser,
} from "features/userSlice";
import { ImageLoader, Loading } from "components";
import { UserDocument } from "@customTypes/users";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, isAdmin } = useAppSelector(selectLoggedInUser);
  const user = useAppSelector(selectUser);
  const response = useAppSelector(selectResponse);
  const pending = useAppSelector(selectPending);
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDocument>({});

  useEffect(() => {
    dispatch(getProfile(accessToken));
    if (response.status === "error") {
      console.log("error", response.message);
      dispatch(logoutUser());
    }
  }, [accessToken, dispatch, response.message, response.status]);

  useEffect(() => {
    user && setUserInfo(user);
  }, [user]);

  const uploadImage = () => {
    setIsUploadImage(!isUploadImage);
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      image: event.target.files && event.target.files[0],
    }));
    if (event.target.files) {
      const newImage = new FormData();
      newImage.append("image", event.target.files[0]);
      dispatch(
        updateUser({
          id: user._id,
          user: newImage,
          token: accessToken,
        })
      );
    }
    setIsUploadImage(false);
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const editProfile = () => {
    dispatch(updateUser({ id: user._id, user: userInfo, token: accessToken }));
  };

  const deleteProfile = () => {
    dispatch(deleteUser({ id: user._id, token: accessToken }));
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      {pending && <Loading />}
      <div className='flex flex-col lg:flex-row justify-between w-[90vw] lg:w-[60vw] h-full mx-auto bg-[#FDC175] border-[#A8824F] border-4'>
        <div className='flex flex-col lg:flex-row w-full gap-2 items-center p-8 lg:py-16'>
          <div className='flex flex-col items-center gap-2 w-full lg:w-[40%]'>
            <ImageLoader
              imageSrc={`users/${userInfo.image}`}
              alt={user.name}
              placeholderSrc={ProfilePlaceholder}
              styles='w-[10rem] lg:w-[15rem] mx-auto'
            />
            <p
              role='button'
              onClick={uploadImage}
              className='text-sm text-center cursor-pointer'
            >
              {isUploadImage ? "Cancel" : "Change profile picture"}
            </p>
            {isUploadImage && (
              <input
                className='block w-[60%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                aria-describedby='file_input_help'
                id='file_input'
                type='file'
                onChange={onChangeImage}
              />
            )}
            {!isEdit ? (
              <h2 className='font-bold text-[2rem] text-center'>
                {userInfo.name}
              </h2>
            ) : (
              <input
                type='text'
                id='name'
                name='name'
                className='bg-inherit text-center text-[2rem] border-b-[#A8824F] border-b-4 p-1 focus:outline-none'
                value={userInfo.name}
                onChange={handleTextInput}
              />
            )}
          </div>
          <div>
            <div className='flex gap-2'>
              {!isEdit ? (
                <>
                  <p>Email:</p>
                  <p>{userInfo.email}</p>
                </>
              ) : (
                <>
                  <label htmlFor='email' className='p-1'>
                    Email:
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='bg-inherit border-b-[#A8824F] border-b-4 p-1 focus:outline-none'
                    value={userInfo.email}
                    onChange={handleTextInput}
                  />
                </>
              )}
            </div>
            <div className='flex gap-2'>
              {!isEdit ? (
                <>
                  <p>Address:</p>
                  <p>{userInfo.address}</p>
                </>
              ) : (
                <>
                  <label htmlFor='address' className='p-1'>
                    Address:
                  </label>
                  <input
                    type='type'
                    id='address'
                    name='address'
                    className='bg-inherit border-b-[#A8824F] border-b-4 p-1 focus:outline-none'
                    value={userInfo.address}
                    onChange={handleTextInput}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className='p-4 lg:py-16 border-t-[#A8824F] border-t-4 lg:border-l-[#A8824F] lg:border-l-4 lg:border-t-0'>
          <ul className='relative flex justify-between h-full lg:flex-col'>
            <li className='flex items-center justify-between gap-4'>
              <Link
                to='#'
                onClick={() => {
                  isEdit && editProfile();
                  setIsEdit(!isEdit);
                }}
                className={`hover:text-[#5d4628] hover:animate-none duration-200 ${
                  isEdit && "text-[#7b5b31] animate-pulse duration-400"
                }`}
              >
                {isEdit ? "Submit" : "Edit Profile"}
              </Link>
              {isEdit && (
                <AiOutlineClose
                  onClick={() => setIsEdit(!isEdit)}
                  className='text-[1.2rem] cursor-pointer text-[#A8824F] hover:text-[#5d4628]'
                />
              )}
            </li>

            {isAdmin ? (
              <Link
                to='/dashboard'
                className='hover:text-[#A8824F] duration-200'
              >
                <li>Dashboard</li>
              </Link>
            ) : (
              <Link to='/cart' className='hover:text-[#A8824F] duration-200'>
                <li>Cart</li>
              </Link>
            )}

            <Link
              to='#'
              onClick={deleteProfile}
              className='hover:text-[#A8824F] duration-200 peer'
            >
              <li>Delete Profile</li>
            </Link>
            <p className='absolute right-0 bottom-[-15vh] lg:w-[20vw] invisible peer-hover:visible font-bold text-[#7d2626] p-4 bg-[#FDC175] border-[#A8824F] border-4'>
              This will delete your profile.
            </p>
          </ul>
        </div>
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

export default Profile;
