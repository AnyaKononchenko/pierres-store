import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiArrowBack } from "react-icons/ti";
import { BsImage } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ProductDocument, Season } from "@customTypes/products";
import {
  getCategories,
  selectCategories,
  selectResponse as selectCategoryResponse,
  selectPending as selectCategoryPending,
} from "features/categoriesSlice";
import {
  createProduct,
  editProduct,
  selectResponse as selectProductResponse,
  selectPending as selectProductPending,
} from "features/productsSlice";
import { logoutUser, selectUser } from "features/authSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";

const ProductForm = ({
  variant,
  initialState,
}: {
  variant: "create" | "edit";
  initialState: ProductDocument;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryResponse = useAppSelector(selectCategoryResponse);
  const categoryPending = useAppSelector(selectCategoryPending);
  const productResponse = useAppSelector(selectProductResponse);
  const productPending = useAppSelector(selectProductPending);
  const categories = useAppSelector(selectCategories);
  const { accessToken } = useAppSelector(selectUser);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    dispatch(getCategories());
    if (categoryResponse.status === "error") {
      toast.error(categoryResponse.message);
    }
  }, [categoryResponse.message, categoryResponse.status, dispatch]);

  useEffect(() => {
    if (productResponse.status === "error") {
      toast.error(productResponse.message);
    }
    if (productResponse.status === "success") {
      setFormData(initialState);
      productResponse.message.match(/created/i) && navigate("/products-board");
    }
    if (productResponse.statusCode === 403) {
      dispatch(logoutUser());
    }
  }, [
    initialState,
    dispatch,
    navigate,
    productResponse.status,
    productResponse.statusCode,
    productResponse.message,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files && event.target.files[0]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.files
        ? event.target.files[0]
        : event.target.value,
    }));
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (season: Season) => {
    if (formData.season.includes(season)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        season: formData.season.filter((prevSeason) => prevSeason !== season),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        season: [...formData.season, season],
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    let season = "";

    type FormDataEntry = [string, string | Blob];

    console.log(formData)
    console.log(formData.image)
    // if(formData.image === initialState.image){
    //   formData.image = null
    // }

    const newProduct = new FormData();

    if (formData.season.length > 0) {
      season = formData.season.join(",");
    }

    for (const [key, value] of Object.entries(formData) as FormDataEntry[]) {
      if (season && key === "season") {
        newProduct.append(key, season);
      } else {
        newProduct.append(key, value);
      }
    }

    variant === "create"
      ? dispatch(createProduct({ product: newProduct, token: accessToken }))
      : dispatch(
          editProduct({
            slug: formData.slug,
            product: newProduct,
            token: accessToken,
          })
        );
  };

  return (
    <>
      <div
        className={`flex flex-col items-center ${
          variant === "create"
            ? "relative w-[90vw] lg:w-[70vw] xl:w-[60vw] my-5 pt-10"
            : "w-full"
        }`}
      >
        {variant === "create" && (
          <button
            className='absolute left-0 top-0 text-[#FDC175] text-[1.7rem] hover:animate-pulse duration-50'
            onClick={() => navigate("/products-board")}
          >
            <TiArrowBack />
          </button>
        )}
        <h2 className='font-bold text-[1.5rem] my-6'>{`${
          variant === "create" ? "Create Product" : "Edit Product"
        }`}</h2>
        {(categoryPending || productPending) && <Loading />}
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 lg:grid-cols-4 lg:gap-y-[1rem] gap-2 w-full bg-[#FDC175] border-[#A8824F] border-4 p-4 lg:py-10'
        >
          <div className='lg:col-span-2 lg:row-span-3 flex flex-col'>
            <label
              htmlFor='image'
              className='flex flex-col items-center cursor-pointer text-[#A8824F] hover:text-[#6c502a] duration-100 w-fit mx-auto'
            >
              <BsImage className='text-[5rem] lg:text-[8rem]' />
              <p>Upload image</p>
            </label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/png'
              onChange={handleInputChange}
              className='hidden'
            />
            {formData.image && (
              <p className='text-center'>Uploaded: {formData.image.name}</p>
            )}
          </div>

          <div className='flex flex-col lg:col-span-2'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={handleInputChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
              required
            />
          </div>

          <div className='flex flex-col lg:col-span-2'>
            <label htmlFor='description'>Description:</label>
            <textarea
              name='description'
              id='description'
              value={formData.description}
              onChange={handleTextAreaChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
              required
            ></textarea>
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row lg:col-span-2'>
            <label htmlFor='price'>Price:</label>
            <input
              type='number'
              name='price'
              id='price'
              value={formData.price}
              onChange={handleInputChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
              required
            />
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row lg:col-span-2'>
            <label htmlFor='category'>Category:</label>
            <select
              name='category'
              id='category'
              value={formData.category}
              onChange={handleSelectChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2 focus:border-none'
            >
              {categories &&
                categories.map((category, index) => (
                  <option
                    key={index}
                    value={category._id}
                    className='bg-[#FDC175]'
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row'>
            <label htmlFor='quality'>Quality:</label>
            <select
              name='quality'
              id='quality'
              value={formData.quality}
              onChange={handleSelectChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
            >
              <option value='Regular' className='bg-[#FDC175]'>
                Regular
              </option>
              <option value='Silver' className='bg-[#FDC175]'>
                Silver
              </option>
              <option value='Gold' className='bg-[#FDC175]'>
                Gold
              </option>
              <option value='Iridium' className='bg-[#FDC175]'>
                Iridium
              </option>
            </select>
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row'>
            <label htmlFor='size'>Size:</label>
            <select
              name='size'
              id='size'
              value={formData.size}
              onChange={handleSelectChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2'
            >
              <option value='' className='bg-[#FDC175]'>
                select
              </option>
              <option value='Regular' className='bg-[#FDC175]'>
                Regular
              </option>
              <option value='Large' className='bg-[#FDC175]'>
                Large
              </option>
              <option value='Deluxe' className='bg-[#FDC175]'>
                Deluxe
              </option>
            </select>
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row'>
            <label htmlFor='inStock'>In Stock:</label>
            <input
              type='number'
              name='inStock'
              id='inStock'
              value={formData.inStock}
              onChange={handleInputChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2 lg:w-2/5'
              required
            />
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row'>
            <label htmlFor='sold'>Sold:</label>
            <input
              type='number'
              name='sold'
              id='sold'
              value={formData.sold}
              onChange={handleInputChange}
              className='bg-inherit border-b-4 border-b-[#A8824F] p-2 lg:w-2/5'
            />
          </div>

          <div className='flex flex-col lg:items-center lg:flex-row'>
            <label htmlFor='season'>Season:</label>
            <div className="flex flex-col gap-2 lg:flex-row p-2">
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={formData.season.includes(Season.spring)}
                  onChange={() => handleCheckboxChange(Season.spring)}
                  className='w-[1rem] h-[1rem] focus:ring-[#A8824F] focus:ring-2'
                />
                <label>Spring</label>
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={formData.season.includes(Season.summer)}
                  onChange={() => handleCheckboxChange(Season.summer)}
                  className='w-[1rem] h-[1rem] focus:ring-[#A8824F] focus:ring-2'
                />
                <label>Summer</label>
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={formData.season.includes(Season.fall)}
                  onChange={() => handleCheckboxChange(Season.fall)}
                  className='w-[1rem] h-[1rem] focus:ring-[#A8824F] focus:ring-2'
                />
                <label>Fall</label>
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={formData.season.includes(Season.winter)}
                  onChange={() => handleCheckboxChange(Season.winter)}
                  className='w-[1rem] h-[1rem] focus:ring-[#A8824F] focus:ring-2'
                />
                <label>Winter</label>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='lg:col-span-4 bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100 w-[40%] p-2 mx-auto'
          >
            {variant === "create" ? "Create" : "Edit"}
          </button>
        </form>
      </div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
};

export default ProductForm;
