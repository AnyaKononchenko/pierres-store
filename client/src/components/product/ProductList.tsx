import React from "react";

import Product from "./Product";
import { ProductWithCategory } from "@customTypes/products";

const ProductList = ({ products }: { products: ProductWithCategory[] }) => {
  return (
    <section className='flex flex-col lg:w-[80vw] w-full min-h-[86vh] bg-[#FDC175] border-[#A8824F] border-4 p-4'>
      {products.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4'>
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className='peer'>No products were found.</div>
          <div className='invisible peer-hover:visible absolute top-20 text-[#7b0707] font-bold'>This may happen when either your search or applied filters produced no results.</div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
