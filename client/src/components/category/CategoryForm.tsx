import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { CategoryDocument } from "@customTypes/categories";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  createCategory,
  getCategories,
  selectError,
  selectMessage,
  selectPending,
  setMessage,
  updateCategory,
} from "features/categoriesSlice";
import Loading from "components/modals/Loading";
import { logoutUser, selectUser } from "features/authSlice";

const CategoryForm = ({
  variant,
  initialState,
}: {
  variant: "create" | "edit";
  initialState: CategoryDocument;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectMessage);
  const error = useAppSelector(selectError);
  const pending = useAppSelector(selectPending);
  const { accessToken } = useAppSelector(selectUser);
  const [formData, setFormData] = useState(initialState);

  // TODO: see how to do it better, cause with this useEffect toast
  // appears 5 times
  useEffect(() => {
    if (error.message && error.message.length > 0) {
      toast.error(error.message);
    }
    if (error.statusCode === 403) {
      dispatch(logoutUser());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (message && message.length > 0) {
      setFormData(initialState);
      navigate("/categories-board");
      dispatch(setMessage(""));
      dispatch(getCategories());
    }
  }, [dispatch, initialState, message, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    variant === "create"
      ? dispatch(createCategory({ category: formData, token: accessToken }))
      : dispatch(
          updateCategory({
            slug: formData.slug,
            category: formData,
            token: accessToken,
          })
        );
  };

  return (
    <div className='flex flex-col items-center p-2'>
      <h2 className='font-bold text-[1.5rem] my-6'>{`${
        variant === "create" ? "Create Category" : "Edit Category"
      }`}</h2>
      {pending && <Loading />}
      <form onSubmit={handleSubmit} className='flex flex-col'>
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

export default CategoryForm;
