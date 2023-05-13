import React, { useEffect } from "react";
import { TbPlus } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProducts,
  selectProducts,
  selectError,
  selectPending,
} from "features/productsSlice";
import { ItemsList, Loading } from "components";
import { useNavigate } from "react-router-dom";

const ProductsBoard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
    if (error.message && error.message.length > 0) {
      console.log("error", error);
      toast.error(error.message);
    }
  }, [dispatch, error]);

  const handleAddProduct = () => {
    navigate('/create-product')
  }

  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <div className="flex justify-between items-center w-full px-4">
        <h2 className='font-bold text-[1.5rem]'>Products</h2>
        <TbPlus size={25} aria-label='Add Product' onClick={handleAddProduct} className="hover:cursor-pointer"/>
      </div>
      {pending && <Loading />}
      <ItemsList items={products} />

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

export default ProductsBoard;
