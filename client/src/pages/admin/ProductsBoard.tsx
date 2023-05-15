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
  deleteProduct,
  selectMessage,
  setMessage,
} from "features/productsSlice";
import { ItemsList, Loading } from "components";
import { useNavigate } from "react-router-dom";
import { ItemType } from "@customTypes/common";
import { ProductDocument } from "@customTypes/products";
import { selectUser } from "features/authSlice";

const ProductsBoard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const products = useAppSelector(selectProducts);
  const message = useAppSelector(selectMessage)

  const { accessToken } = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getProducts());
    if (error && error.message && error.message.length > 0) {
      toast.error(error.message);
    }
    if (message && message.length > 0) {
      toast.success(message);
      console.log("message", message)
      dispatch(setMessage(''));
    }
  }, [dispatch, error, message]);

  const handleAddProduct = () => {
    navigate('/create-product')
  }

  const handleDelete = (item: ItemType | ProductDocument) => {
    dispatch(deleteProduct({slug: "slug" in item ? item.slug : "", token: accessToken}))
  }

  const handleUpdate = (item: ItemType) => {
    console.log(item)
  }

  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <div className="flex justify-between items-center w-full px-4">
        <h2 className='font-bold text-[1.5rem]'>Products</h2>
        <TbPlus size={25} aria-label='Add Product' onClick={handleAddProduct} className="hover:cursor-pointer"/>
      </div>
      {pending && <Loading />}
      <ItemsList items={products} onDelete={handleDelete} onUpdate={handleUpdate}/>
 
      <ToastContainer
        position='top-right'
        autoClose={2000}
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
