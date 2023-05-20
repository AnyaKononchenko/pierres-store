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
import { Helmet } from "react-helmet";
import { FilterPanel } from "components/product";

const Store = () => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const response = useAppSelector(selectResponse);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
    <Helmet>
      <title>Store</title>
    </Helmet>
    <h2 className="font-bold text-[1.3rem] text-center my-6">Discover thousans of goods here!</h2>
    <div className='flex flex-col lg:flex-row justify-between items-center p-4 my-3 gap-6'>
      {pending && <Loading />}
      <FilterPanel />
      {products && <ProductList products={products} />}
    </div>
    </>
  );
};

export default Store;
