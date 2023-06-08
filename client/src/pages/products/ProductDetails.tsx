import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

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
  const navigate = useNavigate();
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
    dispatch(removeFromCart(slug));
  };

  return (
    <>
      {loading && <Loading />}
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <article className='relative w-[90vw] lg:w-[60vw] min-h-[80vh] mt-6 pt-14'>
        <button
          className='absolute left-0 top-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
          onClick={() => navigate("/store")}
        >
          <TiArrowBack />
        </button>

        {product && (
          <div className='flex flex-col lg:flex-row justify-between gap-4  mx-auto bg-[#FDC175] border-[#A8824F] border-4 p-4 '>
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
              <button
                onClick={onRemoveFromCart}
                className='w-[40%] bg-[#c98951] p-2 mx-auto hover:font-bold duration-100'
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={onAddToCart}
                className='w-[40%] bg-[#4eb970] p-2 mx-auto hover:font-bold duration-100'
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default ProductDetails;
