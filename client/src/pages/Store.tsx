import React, { useEffect } from "react";

import ProductList from "components/product/ProductList";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProducts,
  selectResponse,
  selectPending,
  selectProducts,
} from "features/productsSlice";
import { Loading } from "components";

const Store = () => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='flex justify-between items-center p-4 my-8'>
      {pending && <Loading />}
      <aside>Filters</aside>
      {products && <ProductList products={products} />}
    </div>
  );
};

export default Store;
