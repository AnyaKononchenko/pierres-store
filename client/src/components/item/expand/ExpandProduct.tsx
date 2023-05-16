// @ts-nocheck
import { ProductDocument } from "@customTypes/products";
import { ProductForm } from "components/product";
import React from "react";

const ExpandProduct = ({ product, isEdit }: { product: ProductDocument, isEdit: boolean }) => {
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
          {product.season && (
            <div className='flex gap-2 w-full '>
              <p>Season:</p>
              <p>{product.season}</p>
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
