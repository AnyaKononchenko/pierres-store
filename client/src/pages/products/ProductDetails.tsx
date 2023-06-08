import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProduct,
  selectPending,
  selectProduct,
  selectResponse,
} from "features/productsSlice";
import { ImageLoader, Loading } from "components";
import ProductPlaceholder from "../../assets/product-placeholder.png";
import { addToCart, removeFromCart, selectCart } from "features/cartSlice";

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const product = useAppSelector(selectProduct);
  const response = useAppSelector(selectResponse);
  const loading = useAppSelector(selectPending);

  const { slug } = useParams();

  const isInCart = cart.some((cartProduct) => cartProduct.name === slug);

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch, slug]);

  const onAddToCart = () => {
    dispatch(addToCart(slug));
  };

  const onRemoveFromCart = () => {
    dispatch(removeFromCart(slug))
  }

  return (
    <>
      {loading && <Loading />}
      {product && (
        <div className='flex flex-col lg:flex-row justify-between gap-4 w-[90vw] lg:w-[60vw] h-full mx-auto bg-[#FDC175] border-[#A8824F] border-4 p-4 '>
          <div className='flex justify-center p-4'>
            <ImageLoader
              imageSrc={`products/${product.image}`}
              alt={product.name}
              placeholderSrc={ProductPlaceholder}
              styles='w-[10rem] h-auto border-[#A8824F] border-4'
            />
          </div>
          <div>
            <h2 className='text-center font-bold text-[1.2rem]'>
              {product.name}
            </h2>
            <p>{product.description}</p>
          </div>
          {isInCart ? (
            <button onClick={onRemoveFromCart} className='w-[40%] bg-[#c98951] p-2 mx-auto hover:font-bold duration-100'>Remove From Cart</button>
          ) : (
            <button onClick={onAddToCart} className='w-[40%] bg-[#4eb970] p-2 mx-auto hover:font-bold duration-100'>Add to Cart</button>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
