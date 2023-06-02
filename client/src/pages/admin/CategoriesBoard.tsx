import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deleteCategory,
  getCategories,
  selectCategories,
  selectResponse,
  selectPending,
} from "features/categoriesSlice";
import { ItemsList, Loading } from "components";
import { ItemType } from "@customTypes/common";
import { selectUser } from "features/authSlice";

const CategoriesBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);
  const categories = useAppSelector(selectCategories);
  const { accessToken } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getCategories());
    if (response.status === "error") {
      toast.error(response.message);
      // navigate("/login");
    }
  }, [dispatch, response.message, response.status]);

  const handleAddCategory = () => {
    navigate("/create-category");
  };

  const handleDelete = (item: ItemType) => {
    dispatch(
      deleteCategory({
        slug: "slug" in item ? item.slug : "",
        token: accessToken,
      })
    );
  };

  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <div className='flex justify-between items-center w-full px-4'>
        <h2 className='font-bold text-[1.5rem] text-zinc-300'>Categories</h2>
        <TbPlus
          size={25}
          aria-label='Add Product'
          onClick={handleAddCategory}
          className='cursor-pointer text-zinc-300'
        />
      </div>
      {pending && <Loading />}
      <ItemsList items={categories} onDelete={handleDelete} />

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

export default CategoriesBoard;
