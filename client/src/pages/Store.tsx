import React, { useState, useEffect } from "react";

import ProductList from "components/product/ProductList";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getProducts,
  selectResponse,
  selectPending,
  selectProducts,
  selectInfo,
} from "features/productsSlice";
import { Loading, Pagination } from "components";
import { Helmet } from "react-helmet";
import { FilterPanel } from "components/product";
import { FilterQuery } from "@customTypes/products";

const initialQuery: FilterQuery = {
  category: [],
  price: { minPrice: 0, maxPrice: 1000000 },
  search: "",
  sort: ["createdAt"],
  page: 1,
  limit: 20
};

const Store = () => {
  const dispatch = useAppDispatch();
  const pending = useAppSelector(selectPending);
  const info = useAppSelector(selectInfo)
  const response = useAppSelector(selectResponse);
  const products = useAppSelector(selectProducts);
  const [currentQuery, setCurrentQuery] = useState(initialQuery)

  useEffect(() => {
    setCurrentQuery((prevQuery) => ({
      ...prevQuery,
      page: info.currentPage,
    }))
  }, [info]);


  useEffect(() => {
    dispatch(getProducts(initialQuery));
  }, [dispatch]);

  const onFilterProducts = (query: FilterQuery) => {
    console.log(query)
    dispatch(getProducts(query))
    setCurrentQuery((prevQuery) => ({
      ...prevQuery,
      ...query
    }))
  }

  const handlePageChange = (page: number) => {
    setCurrentQuery((prevQuery) => ({
      ...prevQuery,
      page
    }))
    dispatch(getProducts({...currentQuery, page}))
  }

  const handlePerPageChange = (limit: number) => {
    setCurrentQuery((prevQuery) => ({
      ...prevQuery,
      page: 1,
      limit
    }))
    dispatch(getProducts({...currentQuery, page: 1, limit}))
  }

  return (
    <>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <h2 className='font-bold text-[1.3rem] text-center my-6'>
        Discover thousans of goods here!
      </h2>
      <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start p-4 my-3 gap-6'>
        {pending && <Loading />}
        <FilterPanel initialQuery={initialQuery} onFilterProducts={onFilterProducts} />
        {products && <ProductList products={products}/>}
      </div>
        <Pagination controls={info} onPageChange={handlePageChange} onPerPageChange={handlePerPageChange} />
    </>
  );
};

export default Store;
