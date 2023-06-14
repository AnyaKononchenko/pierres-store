import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsSearch,
} from "react-icons/bs";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getCategories,
  selectCategories,
  selectResponse as selectCategoriesResponse,
} from "features/categoriesSlice";
import { FilterQuery } from "@customTypes/products";
import Price from "components/helpers/Price";

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
  const [priceRange, setPriceRange] = useState({ minPrice: 0, maxPrice: 1000 });
  const price = useRef(priceRange);

  const [isOpen, setIsOpen] = useState(false);
  const [isMaxPrice, setIsMaxPrice] = useState(false)

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    price.current = priceRange;
  }, [priceRange]);

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

  const handleSetMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setIsMaxPrice(true)
      setQuery((prevQuery) => ({
        ...prevQuery,
        price: { minPrice: 1000, maxPrice: 1000000 },
      }));
    } else {
      setIsMaxPrice(false)
      setPriceRange(price.current);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      search: event.target.value,
    }));
  };

  const filterProducts = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    onFilterProducts({...query, price: !isMaxPrice ? {...priceRange} : query.price});
  };

  return (
    <section
      className={`flex ${
        !isOpen ? "justify-end" : "justify-start"
      } lg:max-w-[30vw] w-full`}
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
          className='flex flex-col gap-4 w-full bg-[#FDC175] border-[#A8824F] border-4 p-4'
        >
          <div className='flex flex-col gap-2 py-2'>
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
          <div className='flex flex-col gap-2 py-2'>
            <p>Price:</p>
            <div className='flex flex-col gap-2 '>
              <div className='w-full'>
                <Slider
                  range
                  disabled={isMaxPrice}
                  allowCross={false}
                  handleStyle={[
                    { borderColor: "#A8824F", borderWidth: 4 },
                    { borderColor: "#A8824F", borderWidth: 4 },
                  ]}
                  trackStyle={[{ backgroundColor: "#A8824F" }]}
                  defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
                  min={0}
                  max={1000}
                  onChange={(value: number | number[]) => {
                    if (typeof value !== "number") {
                      const [minPrice, maxPrice] = value;
                      setPriceRange({ minPrice, maxPrice });
                    }
                  }}
                />
              </div>
              <div className='flex justify-center gap-6 w-full p-2'>
                <div className='flex'>
                  Min: <Price value={priceRange.minPrice} />
                </div>
                <div className='flex'>
                  Max: <Price value={priceRange.maxPrice} />
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    name='maxPrice'
                    id='maxPrice'
                    onChange={handleSetMaxPrice}
                  />
                  <label htmlFor='maxPrice'>More than 1000</label>
                </div>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className='w-[40%] mx-auto mt-4 bg-[#e1b882] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 p-2'
          >
            Apply Filters
          </button>
        </form>
        <form
          onSubmit={filterProducts}
          className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4 p-4'
        >
          <div className='flex flex-col gap-2 py-2'>
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

          <button
            type='submit'
            className='w-[40%] mx-auto mt-4 bg-[#e1b882] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 p-2'
          >
            Sort
          </button>
        </form>
      </div>

      {/* Mobile menu */}
      {!isOpen ? (
        <div className='flex items-center gap-2 lg:hidden w-full'>
          <div className='flex bg-[#FDC175] border-[#A8824F] border-4'>
            <input
              type='text'
              name='search'
              id='search'
              value={query.search}
              onChange={handleSearch}
              placeholder='Search here..'
              className='bg-inherit p-4 w-[80%]'
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
            <div className='flex bg-[#FDC175] border-[#A8824F] border-4 border-b-0 w-[40%]'>
              <p className='p-4'>Filters</p>
              <div className='flex justify-center items-center border-l-[#A8824F] border-l-4 w-1/3'>
                <BsArrowRightCircleFill
                  size={30}
                  onClick={handleOpen}
                  className='text-[1.3rem] text-[#A8824F] hover:text-[#FFE4A1] cursor-pointer duration-300'
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
                className='bg-inherit p-4 w-[80%]'
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
            className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4 p-4'
          >
            <div className='flex flex-col gap-2 py-2'>
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
            <div className='flex flex-col gap-2 py-2'>
              <p>Price:</p>
              <div className='flex flex-col gap-2 '>
              <div className='w-full'>
                <Slider
                  range
                  disabled={isMaxPrice}
                  allowCross={false}
                  handleStyle={[
                    { borderColor: "#A8824F", borderWidth: 4 },
                    { borderColor: "#A8824F", borderWidth: 4 },
                  ]}
                  trackStyle={[{ backgroundColor: "#A8824F" }]}
                  defaultValue={[priceRange.minPrice, priceRange.maxPrice]}
                  min={0}
                  max={1000}
                  onChange={(value: number | number[]) => {
                    if (typeof value !== "number") {
                      const [minPrice, maxPrice] = value;
                      setPriceRange({ minPrice, maxPrice });
                    }
                  }}
                />
              </div>
              <div className='flex justify-center gap-6 w-full p-2'>
                <div className='flex'>
                  Min: <Price value={priceRange.minPrice} />
                </div>
                <div className='flex'>
                  Max: <Price value={priceRange.maxPrice} />
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    name='maxPrice'
                    id='maxPrice'
                    onChange={handleSetMaxPrice}
                  />
                  <label htmlFor='maxPrice'>More than 1000</label>
                </div>
              </div>
            </div>
          </div>
            <button
              type='submit'
              className='w-[40%] mx-auto mt-4 bg-[#e1b882] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 p-2'
            >
              Apply Filters
            </button>
          </form>
          <form
            onSubmit={filterProducts}
            className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4 border-t-0 p-4'
          >
            <div className='flex flex-col gap-2 py-2'>
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

            <button
              type='submit'
              className='w-[40%] mx-auto mt-4 bg-[#e1b882] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 p-2'
            >
              Sort
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default FilterPanel;
