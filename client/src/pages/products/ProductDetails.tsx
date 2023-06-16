import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProduct,
  selectPending,
  selectProduct,
} from "features/productsSlice";
import { ProductPlaceholder } from "../../assets";
import {
  SilverQuality,
  GoldQuality,
  IridiumQuality,
  Spring,
  Summer,
  Fall,
  Winter,
} from "assets";
import { ImageLoader, Loading, Price } from "components";
import { addToCart, removeFromCart, selectCart } from "features/cartSlice";
import { Quality, Season } from "@customTypes/products";
import { selectIsLoggedIn } from "features/authSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectPending);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { slug } = useParams();

  const seasons = [Spring, Summer, Fall, Winter];

  const isInCart = cart.some((cartProduct) => cartProduct.name === slug);

  const getQualityIcon = () => {
    switch (product.quality) {
      case Quality.silver:
        return SilverQuality;
      case Quality.gold:
        return GoldQuality;
      case Quality.iridium:
        return IridiumQuality;
      default:
        return "";
    }
  };

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch, slug]);

  const onAddToCart = () => {
    isLoggedIn ? dispatch(addToCart(slug)) : navigate("/login");
  };

  const onRemoveFromCart = () => {
    isLoggedIn ? dispatch(removeFromCart(slug)) : navigate("/login");
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Pierre's: {slug}</title>
      </Helmet>
      {loading && <Loading />}
      <article className='relative w-[90vw] lg:w-[60vw] min-h-[80vh] mt-6 pt-14'>
        <button
          className='absolute left-0 top-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
          onClick={() => navigate(-1)}
        >
          <TiArrowBack />
        </button>

        {product && (
          <div className='flex flex-col lg:flex-row justify-between lg:justify-around gap-4 flex-nowrap lg:flex-wrap w-[90vw] md:w-[60vw] lg:min-w-[40vw] xl:w-[40vw] min-h-[40vh] mx-auto bg-[#FDC175] border-[#A8824F] border-4 p-4 lg:py-6'>
            <div className='flex flex-row lg:flex-col justify-between lg:justify-start gap-2 lg:gap-6'>
              <div className='relative flex justify-center items-center w-[10rem] lg:w-[12rem] border-[#A8824F] border-4 mx-auto p-4'>
                <ImageLoader
                  imageSrc={`products/${product.image}`}
                  alt={product.name}
                  placeholderSrc={ProductPlaceholder}
                  styles='w-[8rem] lg:w-[10rem] h-auto'
                />
                {product.quality !== Quality.regular && (
                  <img
                    src={getQualityIcon()}
                    alt={product.quality}
                    className='absolute bottom-3 right-[-2rem] w-[5rem] animate-pulse duration-75'
                  />
                )}
              </div>
              <div
                className={`self-start grid ${
                  product.season.length > 1 ? "grid-cols-2" : "grid-cols-1"
                } gap-x-2 lg:grid-cols-4`}
              >
                {product.season[0] !== Season.notSeasonal &&
                  product.season.map((season: string) => (
                    <div className='relative'>
                      <img
                        src={seasons.find((s) =>
                          s.match(new RegExp(season, "ig"))
                        )}
                        alt={`${season} icon`}
                        className='peer'
                      />
                      <p className='invisible peer-hover:visible duration-100'>
                        {season}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full lg:w-[50%]'>
              <div className='flex justify-between px-10 mb-4'>
                <h2 className='text-center font-bold text-[1.2rem]'>
                  {product.name}
                </h2>
                <Price value={product.price} />
              </div>
              <p>{product.description}</p>
              <p>
                <span className='font-bold'>Quality:</span> {product.quality}
              </p>
              <p>
                <span className='font-bold'>Category:</span>{" "}
                {product.category.name}
              </p>
              <p>
                <span className='font-bold'>Season:</span>{" "}
                {product.season.join(", ")}
              </p>
            </div>
            {isInCart ? (
              <button
                onClick={onRemoveFromCart}
                className='w-fit lg:w-[50%] h-fit bg-[#c98951] p-2 mx-auto hover:font-bold duration-100'
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={onAddToCart}
                className='w-fit lg:w-[50%] h-fit bg-[#4eb970] py-2 px-4 mx-auto hover:font-bold duration-100'
              >
                Add to Cart
              </button>
            )}
          </div>
        )}
      </article>
    </HelmetProvider>
  );
};

export default ProductDetails;
