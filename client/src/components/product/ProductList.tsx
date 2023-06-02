import React from "react";

import Product from "./Product";
import { ProductWithCategory } from "@customTypes/products";

const ProductList = ({
  products,
}: {
  products: ProductWithCategory[];
}) => {
  return (
    <section className='flex flex-col p-4 lg:w-[80vw] w-[85vw] bg-[#FDC175] border-[#A8824F] border-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4'>
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
