import React from "react";

import Placeholder from "../../assets/product-placeholder.png";
import Overlay from "../../assets/Recipe-Overlay.png";
import { ProductWithCategory } from "@customTypes/products";
import ImageLoader from "components/helpers/ImageLoader";
import Price from "components/helpers/Price";
import { Link } from "react-router-dom";

const Product = ({ product }: { product: ProductWithCategory }) => {
  return (
    <Link to={`/products/${product.slug}`}>
      <article
        className='flex flex-col justify-between p-3 aspect-square border-4 border-r-[#D68F54] border-b-[#D68F54] border-l-[#FFE4A1] border-t-[#FFE4A1]
      hover:border-l-[#D68F54] hover:border-t-[#D68F54] hover:border-r-[#FFE4A1] hover:border-b-[#FFE4A1] duration-300 hover:cursor-pointer
    '
      >
        <div className='flex justify-center relative'>
          <ImageLoader
            imageSrc={`/products/${product.image}`}
            alt={product.name}
            placeholderSrc={Placeholder}
            styles={`w-[5rem] h-auto aspect-square ${
              product.category.name === "Recipe" && "blur-[2px]"
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
        <Price value={product.price} styles='' />
      </article>
    </Link>
  );
};

export default Product;
