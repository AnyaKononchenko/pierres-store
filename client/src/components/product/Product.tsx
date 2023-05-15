import React from "react";

import { ProductDocument } from "@customTypes/products";

const Product = ({ product }: { product: ProductDocument }) => {
  return (
    <article className="flex flex-col bg-slate-300">
      <div>
        <img src={`${process.env.REACT_APP_BASE_URL}/media/images/products/${product.image}`} alt={product.name} />
      </div>
      <div>
        <h3>{product.name}</h3>
      </div>
    </article>
  );
};

export default Product;
