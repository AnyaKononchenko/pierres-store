import React from "react";
import { Link } from "react-router-dom";

import ImageLoader from "components/helpers/ImageLoader";
import { ProductWithCategory } from "@customTypes/products";
import { BestSeller as BestSellerIcon, ProductPlaceholder } from "assets";

const BestSeller = ({ product }: { product: ProductWithCategory }) => {
  return (
    <article className='min-w-[95vw] md:min-w-[50vw] lg:min-w-[20vw] h-[35vh] flex flex-col items-center justify-center text-white snap-start'>
      <Link to={`/products/${product.slug}`} className='w-fit flex flex-col items-center justify-center gap-4 hover:shadow-2xl bg-inherit hover:bg-[#7b4a49] rounded-md duration-200 p-4'>
        <div className="relative">
          <img src={BestSellerIcon} alt="best seller icon" className="absolute top-[-2rem] left-[-4rem] w-[3rem]"/>
          <ImageLoader
            imageSrc={`/products/${product.image}`}
            alt={product.name}
            placeholderSrc={ProductPlaceholder}
            styles='w-[35vw] md:w-[20vw] lg:w-[10vw]'
          />
        </div>
        <p className="font-bold text-[1.3rem]">{product.name}</p>
      </Link>
    </article>
  );
};

export default BestSeller;
