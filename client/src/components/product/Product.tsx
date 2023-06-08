import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartPlusFill, BsFillCartDashFill } from "react-icons/bs";

import { ProductWithCategory } from "@customTypes/products";
import Placeholder from "../../assets/product-placeholder.png";
import Overlay from "../../assets/Recipe-Overlay.png";
import ImageLoader from "components/helpers/ImageLoader";
import Price from "components/helpers/Price";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addToCart, removeFromCart, selectCart } from "features/cartSlice";

const Product = ({ product }: { product: ProductWithCategory }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const isInCart = cart.some(
    (cartProduct) => cartProduct.name === product.slug
  );

  return (
      <article
        className='flex flex-col justify-between p-3 aspect-square border-4 border-r-[#D68F54] border-b-[#D68F54] border-l-[#FFE4A1] border-t-[#FFE4A1]
      hover:border-l-[#D68F54] hover:border-t-[#D68F54] hover:border-r-[#FFE4A1] hover:border-b-[#FFE4A1] duration-300 hover:cursor-pointer
    '
      onClick={() => navigate(`/products/${product.slug}`)}
      >
        <div className='flex justify-center relative'>
          <ImageLoader
            imageSrc={`/products/${product.image}`}
            alt={product.name}
            placeholderSrc={Placeholder}
            styles={`w-[5rem] h-auto aspect-square ${
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
        <div>
          <h3 className='text-bold text-center'>{product.name}</h3>
        </div>
        <div className='flex justify-between'>
          <Price value={product.price} styles='' />
          {!isInCart ? (
            <button
              onClick={(event) => {
                event.stopPropagation()
                dispatch(addToCart(product.slug));
              }}
            >
              <BsFillCartPlusFill className='text-[1.4rem] text-[#846234] hover:text-[#A8824F] duration-100' />
            </button>
          ) : (
            <button
              onClick={(event) => {
                event.stopPropagation()
                dispatch(removeFromCart(product.slug));
              }}
            >
              <BsFillCartDashFill className='text-[1.4rem] text-[#846234] hover:text-[#A8824F] duration-100' />
            </button>
          )}
        </div>
      </article>
  );
};

export default Product;
