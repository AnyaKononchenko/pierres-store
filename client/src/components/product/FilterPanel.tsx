import React, { useState, useEffect } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsSearch,
} from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getCategories,
  selectCategories,
  selectResponse as selectCategoriesResponse,
} from "features/categoriesSlice";
import { FilterQuery } from "@customTypes/products";

const sorting = ["name", "price", "category", "createdAt"];

const FilterPanel = ({
  initialQuery,
  onFilterProducts,
}: {
  initialQuery: FilterQuery;
  onFilterProducts: (query: FilterQuery) => void;
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesResponse = useAppSelector(selectCategoriesResponse);

  const [query, setQuery] = useState<FilterQuery>(initialQuery);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (categoryId: string) => {
    if (query.category.includes(categoryId)) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        category: query.category.filter(
          (prevCategory: string) => prevCategory !== categoryId
        ),
      }));
    } else {
      setQuery((prevQuery) => ({
        ...prevQuery,
        category: [...prevQuery.category, categoryId],
      }));
    }
  };

  const handleSortChange = (sortType: string) => {
    if (query.sort.includes(sortType)) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        sort: query.sort.filter(
          (prevSortType: string) => prevSortType !== sortType
        ),
      }));
    } else {
      setQuery((prevQuery) => ({
        ...prevQuery,
        sort: [...prevQuery.sort, sortType],
      }));
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = query.price;
    if (event.target.name === "minPrice") {
      price.minPrice = Number(event.target.value);
    } else {
      price.maxPrice = Number(event.target.value);
    }
    setQuery((prevQuery) => ({
      ...prevQuery,
      price: price,
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      search: event.target.value,
    }));
  };

  const filterProducts = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    onFilterProducts(query);
  };

  return (
    <section
      className={`flex ${
        !isOpen ? "justify-end" : "justify-start"
      } lg:max-w-[30vw] w-[90vw]`}
    >
      <div className='hidden lg:flex flex-col w-full'>
        <div className='flex bg-[#FDC175] border-[#A8824F] border-4 w-[60%] mx-auto mb-10'>
          <input
            type='search'
            name='search'
            id='search'
            value={query.search}
            onChange={handleSearch}
            placeholder='Search here..'
            className='bg-inherit p-4 w-full'
          />
          <div className='border-l-[#A8824F] border-l-4 aspect-square'>
            <BsSearch
              size={30}
              onClick={filterProducts}
              className='my-3 mx-3 text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
            />
          </div>
        </div>
        <div className='flex bg-[#FDC175] border-[#A8824F] border-4 border-b-0 w-[35%]'>
            <p className='p-4'>Filters</p>
        </div>
        <form
          onSubmit={filterProducts}
          className='flex flex-col gap-4 bg-[#FDC175] border-[#A8824F] border-4 p-4'
        >
          <div>
            <p>Categories:</p>
            <div className='grid grid-cols-3 px-2'>
              {categories &&
                categories.map((category, index) => (
                  <div key={index}>
                    <input
                      type='checkbox'
                      checked={query.category.includes(category._id)}
                      onChange={() => handleCheckboxChange(category._id)}
                      className='mr-2'
                    />
                    <label>{category.name}</label>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p>Price:</p>
            <div className='flex gap-2'>
              <div className='flex w-[40%]'>
                <label htmlFor='minPrice'> Min:</label>
                <input
                  type='number'
                  name='minPrice'
                  id='minPrice'
                  value={query.price.minPrice}
                  onChange={handlePriceChange}
                  className='w-[5rem]'
                />
              </div>
              <div className='flex w-[40%]'>
                <label htmlFor='maxPrice'> Max: </label>
                <input
                  type='number'
                  name='maxPrice'
                  id='maxPrice'
                  value={query.price.maxPrice}
                  onChange={handlePriceChange}
                  className='w-[5rem]'
                />
              </div>
            </div>
          </div>
          <button type='submit'>Apply Filters</button>
        </form>
        <form
          onSubmit={filterProducts}
          className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4'
        >
          <div>
            <p>Sort By:</p>
            <div className='grid grid-cols-3 px-2'>
              {sorting.map((sortType, index) => (
                <div key={index}>
                  <input
                    type='checkbox'
                    checked={query.sort.includes(sortType)}
                    onChange={() => handleSortChange(sortType)}
                    className='mr-2'
                  />
                  <label>{sortType}</label>
                </div>
              ))}
            </div>
          </div>

          <button type='submit'>Sort</button>
        </form>
      </div>

      {/* Mobile menu */}
      {!isOpen ? (
        <div className='flex items-center gap-2 lg:hidden'>
          <div className='flex bg-[#FDC175] border-[#A8824F] border-4'>
            <input
              type='text'
              name='search'
              id='search'
              value={query.search}
              onChange={handleSearch}
              placeholder='Search here..'
              className='bg-inherit p-4'
            />
            <div className='border-l-[#A8824F] border-l-4'>
              <BsSearch
                size={30}
                onClick={filterProducts}
                className='my-3 mx-3 text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
              />
            </div>
          </div>
          <div className='flex bg-[#FDC175] border-[#A8824F] border-4'>
            <div className='border-r-[#A8824F] border-r-4'>
              <BsArrowLeftCircleFill
                size={30}
                onClick={handleOpen}
                className='my-3 mx-3 text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
              />
            </div>
            <p className='p-4'>Filters</p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col w-full lg:hidden'>
          <div className='flex justify-between gap-2'>
            <div className='flex bg-[#FDC175] border-[#A8824F] border-4 border-b-0 w-[35%]'>
              <p className='p-4'>Filters</p>
              <div className='border-l-[#A8824F] border-l-4'>
                <BsArrowRightCircleFill
                  size={30}
                  onClick={handleOpen}
                  className='my-3 mx-3 text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
                />
              </div>
            </div>
            <div className='flex bg-[#FDC175] border-[#A8824F] border-4 border-b-0'>
              <input
                type='search'
                name='search'
                id='search'
                value={query.search}
                onChange={handleSearch}
                placeholder='Search here..'
                className='bg-inherit p-4'
              />
              <div className='border-l-[#A8824F] border-l-4'>
                <BsSearch
                  size={30}
                  onClick={filterProducts}
                  className='my-3 mx-3 text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
                />
              </div>
            </div>
          </div>
          <form
            onSubmit={filterProducts}
            className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4'
          >
            <div>
              <p>Categories:</p>
              <div className='grid grid-cols-3 px-2'>
                {categories &&
                  categories.map((category, index) => (
                    <div key={index}>
                      <input
                        type='checkbox'
                        checked={query.category.includes(category._id)}
                        onChange={() => handleCheckboxChange(category._id)}
                        className='mr-2'
                      />
                      <label>{category.name}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <p>Price:</p>
              <div className='flex gap-2'>
                <div className='flex w-[40%]'>
                  <label htmlFor='minPrice'> Min:</label>
                  <input
                    type='number'
                    name='minPrice'
                    id='minPrice'
                    value={query.price.minPrice}
                    onChange={handlePriceChange}
                    className='w-[5rem]'
                  />
                </div>
                <div className='flex w-[40%]'>
                  <label htmlFor='maxPrice'> Max: </label>
                  <input
                    type='number'
                    name='maxPrice'
                    id='maxPrice'
                    value={query.price.maxPrice}
                    onChange={handlePriceChange}
                    className='w-[5rem]'
                  />
                </div>
              </div>
            </div>
            <button type='submit'>Apply Filters</button>
          </form>
          <form
            onSubmit={filterProducts}
            className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4'
          >
            <div>
              <p>Sort By:</p>
              <div className='grid grid-cols-3 px-2'>
                {sorting.map((sortType, index) => (
                  <div key={index}>
                    <input
                      type='checkbox'
                      checked={query.sort.includes(sortType)}
                      onChange={() => handleSortChange(sortType)}
                      className='mr-2'
                    />
                    <label>{sortType}</label>
                  </div>
                ))}
              </div>
            </div>

            <button type='submit'>Sort</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default FilterPanel;
