// @ts-nocheck
import React, { useState, useEffect } from "react";

import { CartItem, Price } from "components";
import { getCart, selectCart, selectProducts } from "features/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const products = useAppSelector(selectProducts);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getCart({ slugs: cart.map((product) => product.name).join(',') }));
  }, [cart, dispatch]);

  useEffect(() => {
    products &&
      setTotalPrice(products.reduce((total, { slug, price }) => {
        const currAmount = cart.some((createProduct) => createProduct.name === slug) ? cart.find((createProduct) => createProduct.name === slug).amount : 1;
        return total + (price * currAmount)
      }, 0));
  }, [cart, products]);

  const updateTotal = (price) => {
    setTotalPrice((prevState) => prevState + price);
  };

  return (
    <section className='w-[90vw] lg:w-[50vw] bg-[#FDC175] border-[#A8824F] border-4 p-4'>
      {products.length > 0 ? (
        <>
          <div className="flex flex-col gap-4 lg:px-10">
            {products.map((product, index) => (
              <CartItem
                key={index}
                product={product}
                amount={cart.some((cartProduct) => cartProduct.name === product.slug) ? cart.find((cartProduct) => cartProduct.name === product.slug).amount : 0}
                onAmountChange={updateTotal}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <div className='flex'>
              <p>Total:</p>
              <Price value={totalPrice} />
            </div>
            <button className="bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 w-[40%] mx-auto p-2">Checkout</button>
          </div>
        </>
      ) : (
        <div>Nothing in the cart yet.</div>
      )}
    </section>
  );
};

export default Cart;
