import React, { useState, useEffect } from "react";

import { ProductList } from "components";
import { getCart, selectCart, selectProducts } from "features/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const products = useAppSelector(selectProducts)

  useEffect(() => {
    dispatch(getCart({slugs: cart.join(',')}))
  }, [cart, dispatch])

  return (
    <section>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div>Nothing in the cart yet.</div>
      )}
    </section>
  );
};

export default Cart;
