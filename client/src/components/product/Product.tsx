import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCartPlusFill, BsFillCartDashFill } from "react-icons/bs";

import Price from "components/helpers/Price";
import ImageLoader from "components/helpers/ImageLoader";
import { ProductWithCategory } from "@customTypes/products";
import { RecipeIcon, ProductPlaceholder } from "../../assets";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { addToCart, removeFromCart, selectCart } from "features/cartSlice";
import { selectIsLoggedIn } from "features/authSlice";

const Product = ({ product }: { product: ProductWithCategory }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const isInCart = cart.some(
    (cartProduct) => cartProduct.name === product.slug
  );

  return (
    <article
      className='flex flex-col gap-2 w-full h-[14rem] md:h-[15rem] lg:h-[14rem] aspect-square border-4 border-r-[#D68F54] border-b-[#D68F54] border-l-[#FFE4A1] border-t-[#FFE4A1]
      hover:border-l-[#D68F54] hover:border-t-[#D68F54] hover:border-r-[#FFE4A1] hover:border-b-[#FFE4A1] duration-300 hover:cursor-pointer p-3'
      onClick={() => navigate(`/products/${product.slug}`)}
    >
      <div className='flex justify-center relative w-full'>
        <ImageLoader
          imageSrc={`/products/${product.image}`}
          alt={product.name}
          placeholderSrc={ProductPlaceholder}
          styles={`w-[5rem] md:w-[7rem] lg:w-[5.5rem] h-auto aspect-square ${
            product.category.name === "Recipe" && "grayscale"
          }`}
        />
        {product.category.name === "Recipe" && (
          <img
            src={RecipeIcon}
            alt='Recipe Mark'
            className='absolute bottom-0 right-[20%] w-[50%]'
          />
        )}
      </div>
      <div>
        <h3 className='text-bold text-center'>{product.name}</h3>
      </div>
      <div className='flex justify-between mt-auto'>
        <Price value={product.price} styles='' />
        {!isInCart ? (
          <button
            onClick={(event) => {
              event.stopPropagation();
              isLoggedIn
                ? dispatch(addToCart(product.slug))
                : navigate("/login");
            }}
          >
            <BsFillCartPlusFill className='text-[1.4rem] text-[#846234] hover:text-[#A8824F] duration-100' />
          </button>
        ) : (
          <button
            onClick={(event) => {
              event.stopPropagation();
              isLoggedIn
                ? dispatch(removeFromCart(product.slug))
                : navigate("/login");
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
