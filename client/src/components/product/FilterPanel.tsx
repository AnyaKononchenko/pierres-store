import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  getCategories,
  selectCategories,
  selectResponse as selectCategoriesResponse,
} from "features/categoriesSlice";
import { CategoryDocument } from "@customTypes/categories";

const FilterPanel = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesResponse = useAppSelector(selectCategoriesResponse);

  const [query, setQuery] = useState<{
    categories: string[];
    price: { minPrice: number; maxPrice: number };
  }>({
    categories: [],
    price: { minPrice: 0, maxPrice: 1000000 },
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (categoryId: string) => {
    if (query.categories.includes(categoryId)) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        categories: query.categories.filter(
          (prevCategory: string) => prevCategory !== categoryId
        ),
      }));
    } else {
      setQuery((prevQuery) => ({
        ...prevQuery,
        categories: [...prevQuery.categories, categoryId],
      }));
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      value: {
        [event.target.name]: event.target.value,
      },
    }));
  };

  const filterProducts = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    console.log('filter params', query)
  }

  return (
    <section
      className={`flex ${
        !isOpen ? "justify-end" : "justify-start"
      } lg:max-w-[60vw] w-[90vw]`}
    >
      {!isOpen ? (
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
      ) : (
        <div className='flex flex-col w-full'>
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
          <form onSubmit={filterProducts} className='flex flex-col bg-[#FDC175] border-[#A8824F] border-4'>
            <div>
              <p>Categories:</p>
              <div className='grid grid-cols-3 px-2'>
                {categories &&
                  categories.map((category, index) => (
                    <div key={index}>
                      <input
                        type='checkbox'
                        checked={query.categories.includes(category._id)}
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
                    value={query.price.minPrice}
                    id='minPrice'
                    onChange={handlePriceChange}
                    className='w-[5rem]'
                  />
                </div>
                <div className='flex w-[40%]'>
                  <label htmlFor='maxPrice'> Max: </label>
                  <input
                    type='number'
                    name='maxPrice'
                    value={query.price.maxPrice}
                    id='maxPrice'
                    onChange={handlePriceChange}
                    className='w-[5rem]'
                  />
                </div>
              </div>
            </div>
            <button type='submit'>Filter</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default FilterPanel;
