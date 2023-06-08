import React, { useState } from "react";

import { ProductWithCategory } from "@customTypes/products";
import ImageLoader from "components/helpers/ImageLoader";
import Placeholder from "../../assets/product-placeholder.png";
import Overlay from "../../assets/Recipe-Overlay.png";
import Price from "components/helpers/Price";
import { useAppDispatch } from "redux/hooks";
import { changeProductAmount, removeFromCart } from "features/cartSlice";

const CartItem = ({
  product,
  amount,
  onAmountChange,
}: {
  product: ProductWithCategory;
  amount: number;
  onAmountChange: (price: number) => void;
}) => {
  const dispatch = useAppDispatch();

  const handleAmountChange = (sign: "+" | "-") => {
    switch (sign) {
      case "+":
        if (amount < 100) {
          dispatch(changeProductAmount({name: product.slug, amount: amount + 1}))
        }
        onAmountChange(product.price);
        break;
      case "-":
        if (amount > 1) {
          dispatch(changeProductAmount({name: product.slug, amount: amount - 1}))
          onAmountChange(-product.price);
        }
        break;
      default:
        return -1;
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.slug));
  };

  return (
    <div className='grid grid-cols-5 items-center lg:border-4 lg:border-[#c7a16f] lg:p-4'>
      <div className='grid grid-cols-3 lg:grid-cols-2 items-center col-span-3 lg:gap-4'>
        <div className='flex justify-center relative lg:col-span-2'>
          <ImageLoader
            imageSrc={`/products/${product.image}`}
            alt={product.name}
            placeholderSrc={Placeholder}
            styles={`w-[3rem] lg:w-[5rem] h-auto aspect-square ${
              product.category.name === "Recipe" && "grayscale"
            }`}
          />
          {product.category.name === "Recipe" && (
            <img
              src={Overlay}
              alt='Recipe Mark'
              className='absolute bottom-0 right-[20%] w-[50%]'
            />
          )}
        </div>
        <div className="flex lg:justify-end justify-center">
          <p>{product.name}</p>
        </div>

        <div className="flex lg:justify-start justify-center">
          <Price value={product.price} />
        </div>
      </div>

      <div className='flex items-center m-auto'>
        <button
          onClick={() => handleAmountChange("-")}
          className='border-[rgb(168,130,79)] border-4 rounded-tl-md rounded-bl-md w-6 aspect-square hover:font-bold duration-100'
        >
          -
        </button>
        <p className='w-6 text-center border-t-[#A8824F] border-b-[#A8824F] border-t-4 border-b-4'>
          {amount}
        </p>
        <button
          onClick={() => handleAmountChange("+")}
          className='border-[#A8824F] border-4 rounded-tr-md rounded-br-md w-6 aspect-square hover:font-bold duration-100'
        >
          +
        </button>
      </div>
      <button
        className='ml-1 hover:font-bold duration-100'
        onClick={handleRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
