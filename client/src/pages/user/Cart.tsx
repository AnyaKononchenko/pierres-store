// @ts-nocheck
import React, { useState, useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { FaShoppingBasket } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import { CartItem, Price } from "components";
import {
  clearCart,
  getCart,
  selectCart,
  selectProducts,
} from "features/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const products = useAppSelector(selectProducts);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getCart({ slugs: cart.map((product) => product.name).join(",") }));
  }, [cart, dispatch]);

  useEffect(() => {
    products &&
      setTotalPrice(
        products.reduce((total, { slug, price }) => {
          const currAmount = cart.some(
            (createProduct) => createProduct.name === slug
          )
            ? cart.find((createProduct) => createProduct.name === slug).amount
            : 1;
          return total + price * currAmount;
        }, 0)
      );
  }, [cart, products]);

  const updateTotal = (price) => {
    setTotalPrice((prevState) => prevState + price);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <section className='relative flex flex-col mt-8'>
      <div className='relative flex items-center justify-center w-full'>
        <button
          className='absolute left-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
          onClick={() => navigate(-1)}
        >
          <TiArrowBack />
        </button>
        <h2 className='font-bold text-[1.5rem] text-zinc-300 '>Cart</h2>
        <button
          onClick={handleClearCart}
          className='peer absolute right-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
          aria-label='Clear the cart'
        >
          <RiDeleteBinFill />
        </button>
        <p className='invisible peer-hover:visible absolute right-0 top-8 text-[#FDC175] text-[1.3rem]'>
          Clear the cart
        </p>
      </div>
      <div className='w-[90vw] lg:w-[50vw] h-fit bg-[#FDC175] border-[#A8824F] border-4 my-8 p-4'>
        {products.length > 0 ? (
          <>
            <div className='flex flex-col gap-4 lg:px-10'>
              {products.map((product, index) => (
                <CartItem
                  key={index}
                  product={product}
                  amount={
                    cart.some(
                      (cartProduct) => cartProduct.name === product.slug
                    )
                      ? cart.find(
                          (cartProduct) => cartProduct.name === product.slug
                        ).amount
                      : 0
                  }
                  onAmountChange={updateTotal}
                />
              ))}
            </div>
            <div className='flex flex-col gap-4 mt-6'>
              <div className='flex'>
                <p>Total:</p>
                <Price value={totalPrice} />
              </div>
              <button className='bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 w-[40%] mx-auto p-2'>
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-between h-[40vh] '>
            <p>Nothing in the cart yet.</p>
            <button
              onClick={() => {
                navigate("/store");
              }}
              className='self-center flex gap-2 justify-center w-fit bg-[#e1b882] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 p-4'
            >
              <FaShoppingBasket className='text-[1.7rem] text-[#A8824F]' /> Go
              Shopping
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
