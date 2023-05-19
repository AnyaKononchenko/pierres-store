import React from "react";

import Product from "./Product";
import { ProductDocument } from "@customTypes/products";

const ProductList = ({ products }: { products: ProductDocument[] }) => {
  return (
    <section className='grid grid-col-4 gap-4 max-w-[60vw]'>
      {products.map((product, index) => <Product key={index} product={product}/>)}
    </section>
  );
};

export default ProductList;
