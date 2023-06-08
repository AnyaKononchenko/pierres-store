import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { CategoryDocument } from "@customTypes/categories";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  createCategory,
  selectPending,
  selectResponse,
  updateCategory,
} from "features/categoriesSlice";
import Loading from "components/helpers/Loading";
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
  const response = useAppSelector(selectResponse);
  const pending = useAppSelector(selectPending);
  const { accessToken } = useAppSelector(selectUser);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (response.status === "success") {
      setFormData(initialState);
      response.message.match(/created/i) && navigate("/categories-board");
    }
    if (response.status === "error") {
      toast.error(response.message);
    }
    if (response.statusCode === 403) {
      dispatch(logoutUser());
    }
  }, [
    dispatch,
    initialState,
    navigate,
    response.message,
    response.status,
    response.statusCode,
  ]);

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
    <>
      <div className={`flex flex-col items-center ${variant === 'create' ? 'relative w-[90vw] lg:w-[40vw] mt-5 pt-10' : 'w-full'}`}>
        {variant === "create" && (
          <button
            className='absolute left-0 top-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
            onClick={() => navigate("/categories-board")}
          >
            <TiArrowBack />
          </button>
        )}
        <h2 className='font-bold text-[1.5rem] my-6'>{`${
          variant === "create" ? "Create Category" : "Edit Category"
        }`}</h2>
        {pending && <Loading />}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 w-full bg-[#FDC175] border-[#A8824F] border-4 p-4'
        >
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
            required
          />
          <button
            type='submit'
            className='bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 w-[40%] p-2 mx-auto'
          >
            Create
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
    </>
  );
};

export default CategoryForm;
