import React, { useEffect } from "react";
import { TbPlus } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProducts,
  selectProducts,
  selectResponse,
  selectPending,
  deleteProduct,
} from "features/productsSlice";
import { ItemsList, Loading } from "components";
import { useNavigate } from "react-router-dom";
import { ItemType } from "@customTypes/common";
import { selectUser } from "features/authSlice";
import { FilterQuery } from "@customTypes/products";

const initialQuery: FilterQuery = {
  category: [],
  price: { minPrice: 0, maxPrice: 1000000 },
  search: "",
  sort: ["createdAt"],
  page: 1,
  limit: 200,
};

const ProductsBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);
  const products = useAppSelector(selectProducts);

  const { accessToken } = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getProducts(initialQuery));
    if (response.status === "error") {
      toast.error(response.message);
    }
  }, [dispatch, response.message, response.status]);

  const handleAddProduct = () => {
    navigate("/create-product");
  };

  const handleDelete = (item: ItemType) => {
    dispatch(
      deleteProduct({
        slug: "slug" in item ? item.slug : "",
        token: accessToken,
      })
    );
  };

  return (
    <div className='flex flex-col justify-around items-center p-3 lg:max-w-[70vw] mx-auto'>
      <div className='flex justify-between items-center w-full px-4'>
        <div className='relative flex items-center justify-center w-full'>
          <button
            className='absolute left-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
            onClick={() => navigate("/dashboard")}
          >
            <TiArrowBack />
          </button>
          <h2 className='font-bold text-[1.5rem] text-zinc-300'>Products</h2>
        </div>
        <TbPlus
          size={25}
          aria-label='Add Product'
          onClick={handleAddProduct}
          className='cursor-pointer text-zinc-300'
        />
      </div>
      {pending && <Loading />}
      <ItemsList items={products} onDelete={handleDelete} />

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
