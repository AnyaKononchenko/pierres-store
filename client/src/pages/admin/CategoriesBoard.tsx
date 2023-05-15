import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getCategories,
  selectCategories,
  selectError,
  selectPending,
} from "features/categoriesSlice";
import { ItemsList, Loading } from "components";

const CategoriesBoard = () => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
    if (error.message && error.message.length > 0) {
      console.log("error", error);
      toast.error(error.message);
      // navigate("/login");
    }
  }, [dispatch, error]);


  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <h2 className='font-bold text-[1.5rem]'>Categories</h2>
      {pending && <Loading />}
      {/* <ItemsList items={categories}/> */}

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
