import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { UserDocument } from "@customTypes/users";
import { createUser, selectPending, selectResponse } from "features/authSlice";

import { updateUser, selectPending as selectUpdatePending, selectResponse as selectUpdateResponse } from "features/userSlice";
import { logoutUser, selectUser } from "features/authSlice";
import Loading from "components/modals/Loading";

const UserForm = ({
  variant,
  initialState,
}: {
  variant: "create" | "edit";
  initialState: UserDocument;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectResponse);
  const pending = useAppSelector(selectPending);
  const { accessToken } = useAppSelector(selectUser);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (response.status === "error") {
      toast.error(response.message);
    }
    if (response.status === "success" && response.message.match(/email/gi)) {
      setFormData(initialState);
      toast(response.message);
      if (variant === "create") {
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    }
    if (response.statusCode === 403) {
      dispatch(logoutUser());
    }
  }, [
    initialState,
    dispatch,
    navigate,
    variant,
    response.statusCode,
    response.status,
    response.message,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.files
        ? event.target.files[0]
        : event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    type FormDataEntry = [string, string | Blob];

    const newUser = new FormData();

    for (const [key, value] of Object.entries(formData) as FormDataEntry[]) {
      newUser.append(key, value);
    }

    variant === "create"
      ? dispatch(createUser(newUser))
      : dispatch(
          updateUser({ id: formData._id, user: newUser, token: accessToken })
        );
  };

  return (
    <div className='flex flex-col items-center p-2'>
      <h2 className='font-bold text-[1.5rem] my-6'>{`${
        variant === "create" ? "Join The Pierre's Community!" : "Edit Profile"
      }`}</h2>
      {pending && <Loading />}
      <form onSubmit={handleSubmit} className='flex flex-col'>
        {/* <label>
          Image:
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label> */}

        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />

        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          name='address'
          id='address'
          value={formData.address}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />
        <button type='submit'>Submit</button>
      </form>
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

export default UserForm;
