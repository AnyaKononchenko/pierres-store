// @ts-nocheck
import { ProductWithCategory } from "@customTypes/products";
import React from "react";

import { ProductForm } from "components/product";

const ExpandProduct = ({ product, isEdit }: { product: ProductWithCategory, isEdit: boolean }) => {
  return (
    <>
      {!isEdit ? (
        <div className='flex flex-col w-full'>
          <div className='flex gap-2 w-full '>
            <p>Description:</p>
            <p>{product.description}</p>
          </div>
          <div className='flex gap-2 w-full '>
            <p>Price:</p>
            <p>{product.price}</p>
          </div>
          <div className='flex gap-2 w-full '>
            <p>In Stock:</p>
            <p>{product.inStock}</p>
          </div>
          <div className='flex gap-2 w-full '>
            <p>Quality:</p>
            <p>{product.quality}</p>
          </div>
          <div className='flex gap-2 w-full '>
            <p>Category:</p>
            <p>{product.category.name}</p>
          </div>
          {product.season.length > 0 && (
            <div className='flex gap-2 w-full '>
              <p>Season:</p>
              <p>{product.season.join(', ')}</p>
            </div>
          )}
          {product.size && (
            <div className='flex gap-2 w-full '>
              <p>Size:</p>
              <p>{product.size}</p>
            </div>
          )}
          {product.color && (
            <div className='flex gap-2 w-full '>
              <p>Color:</p>
              <p>{product.color}</p>
            </div>
          )}
        </div>
      ) : (
        <ProductForm variant="edit" initialState={{...product, category: product.category._id}}/>
      )}
    </>
  );
};

export default ExpandProduct;
