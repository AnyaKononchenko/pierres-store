import React from "react";

import Product from "./Product";
import { PaginationInfo, ProductWithCategory } from "@customTypes/products";
import Pagination from "components/helpers/Pagination";

const ProductList = ({
  products,
}: {
  products: ProductWithCategory[];
}) => {
  return (
    <section className='flex flex-col p-4 lg:w-[80vw] max-w-[90vw] bg-[#FDC175] border-[#A8824F] border-4'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4'>
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
