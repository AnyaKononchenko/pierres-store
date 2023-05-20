import React from "react";

import Product from "./Product";
import { ProductWithCategory } from "@customTypes/products";

const ProductList = ({ products }: { products: ProductWithCategory[] }) => {
  return (
    <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 p-4 lg:max-w-[60vw] max-w-[90vw] bg-[#FDC175] border-[#A8824F] border-4'>
      {products.map((product, index) => <Product key={index} product={product}/>)}
    </section>
  );
};

export default ProductList;
