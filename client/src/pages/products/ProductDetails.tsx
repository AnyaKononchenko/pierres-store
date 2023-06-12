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
import ProductPlaceholder from "../../assets/product-placeholder.png";
import { SilverQuality, GoldQuality, IridiumQuality, Spring, Summer, Fall, Winter } from "assets";
import { ImageLoader, Loading, Price } from "components";
import { addToCart, removeFromCart, selectCart } from "features/cartSlice";
import { Quality } from "@customTypes/products";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const product = useAppSelector(selectProduct);
  const response = useAppSelector(selectResponse);
  const loading = useAppSelector(selectPending);

  const { slug } = useParams();

  const isInCart = cart.some((cartProduct) => cartProduct.name === slug);

  const qualityIcon =  () => {
    switch(product.quality){
      case Quality.silver:
        return SilverQuality
      case Quality.gold:
        return GoldQuality
      case Quality.iridium:
        return IridiumQuality
      default:
        return ''
    }
  }
  // console.log(product)

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
        <title>Pierre's: {slug}</title>
      </Helmet>
      <article className='relative w-[90vw] lg:w-[60vw] min-h-[80vh] mt-6 pt-14'>
        <button
          className='absolute left-0 top-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
          onClick={() => navigate(-1)}
        >
          <TiArrowBack />
        </button>

        {product && (
          <div className='flex flex-col lg:flex-row justify-between gap-4  mx-auto bg-[#FDC175] border-[#A8824F] border-4 p-4 '>
            <div className='relative flex justify-center items-center w-[10rem] border-[#A8824F] border-4 mx-auto p-4'>
              <ImageLoader
                imageSrc={`products/${product.image}`}
                alt={product.name}
                placeholderSrc={ProductPlaceholder}
                styles='w-[8rem] h-auto '
              />
              <img src={qualityIcon()} alt={product.quality} className='absolute bottom-3 right-[-2rem] w-[5rem] animate-pulse duration-75'/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-10">
                <h2 className='text-center font-bold text-[1.2rem]'>
                  {product.name}
                </h2>
                <Price value={product.price}/>
              </div>
              <p>{product.description}</p>
              <p><span className="font-bold">Quality:</span> {product.quality}</p>
              <p><span className="font-bold">Category:</span> {product.category.name}</p>
              <p><span className="font-bold">Season:</span> {product.season.join(', ')}</p>
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
