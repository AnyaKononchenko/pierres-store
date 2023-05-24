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
import ProductPlaceholder from '../../assets/product-placeholder.png'

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const response = useAppSelector(selectResponse);
  const loading = useAppSelector(selectPending);

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [dispatch, slug]);

  return (
    <>
      {loading && <Loading />}
      {product && (
        <div className='flex flex-col lg:flex-row justify-between gap-4 w-[90vw] lg:w-[60vw] h-full mx-auto bg-[#FDC175] border-[#A8824F] border-4 p-4 '>
          <div className="flex justify-center">
            <ImageLoader imageSrc={`products/${product.image}`} alt={product.name} placeholderSrc={ProductPlaceholder} styles="w-[10rem] border-[#A8824F] border-4"/>
          </div>
          <div>
            <h2 className="text-center font-bold text-[1.2rem]">{product.name}</h2>
            <p>{product.description}</p>
          </div>
          <button>Add to Cart</button>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
