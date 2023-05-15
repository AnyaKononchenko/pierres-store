import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ProductDocument, Quality } from "@customTypes/products";
import {
  getCategories,
  selectCategories,
  selectError,
  selectPending,
} from "features/categoriesSlice";
import {
  createProduct,
  selectError as selectProductError,
  selectMessage,
  selectPending as selectProductPending,
  setMessage,
} from "features/productsSlice";
import { logoutUser, selectUser } from "features/authSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";

const emptyForm: ProductDocument = {
  name: "",
  description: "",
  price: 1,
  inStock: 0,
  quality: Quality.regular,
  sold: 0,
  category: "",
};


const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const pending = useAppSelector(selectPending);
  const productError = useAppSelector(selectProductError);
  const productPending = useAppSelector(selectProductPending);
  const categories = useAppSelector(selectCategories);
  const message = useAppSelector(selectMessage);
  const { accessToken } = useAppSelector(selectUser);
  
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    dispatch(getCategories());
    if (error.message && error.message.length > 0) {
      toast.error(error.message);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (productError.message && productError.message.length > 0) {
      toast.error(productError.message);
    } 
    if (message && message.length > 0) {
      setFormData(emptyForm);
      navigate("/products-board");
      dispatch(setMessage(''));
    }
    if (productError.statusCode === 403) {
      dispatch(logoutUser());
    }
  }, [message, productError, dispatch, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    type FormDataEntry = [string, string | Blob];

    const newProduct = new FormData();

    for (const [key, value] of Object.entries(formData) as FormDataEntry[]) {
      newProduct.append(key, value);
    }

    dispatch(createProduct({ product: newProduct, token: accessToken }));
  };

  return (
    <div className='flex flex-col items-center p-2'>
      <h2 className='font-bold text-[1.5rem] my-6'>CreateProduct</h2>
      {(pending || productPending) && <Loading />}
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          id='name'
          value={formData.name}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />
        <label>
          Image:
          <input
            type='file'
            name='image'
            accept='image/*'
            // value={formData.image}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          id='description'
          value={formData.description}
          onChange={handleTextAreaChange}
          className='border border-zinc-600'
          required
        ></textarea>
        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          name='price'
          id='price'
          value={formData.price}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />
        <label htmlFor='inStock'>In Stock:</label>
        <input
          type='number'
          name='inStock'
          id='inStock'
          value={formData.inStock}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
          required
        />
        <label htmlFor='quality'>Quality:</label>
        <select
          name='quality'
          id='quality'
          value={formData.quality}
          onChange={handleSelectChange}
          className='border-b border-zinc-600'
        >
          <option value='Regular'>Regular</option>
          <option value='Silver'>Silver</option>
          <option value='Gold'>Gold</option>
          <option value='Iridium'>Iridium</option>
        </select>
        <label htmlFor='sold'>Sold:</label>
        <input
          type='number'
          name='sold'
          id='sold'
          value={formData.sold}
          onChange={handleInputChange}
          className='border-b border-zinc-600'
        />
        <label htmlFor='category'>Category:</label>
        <select
          name='category'
          id='category'
          value={formData.category}
          onChange={handleSelectChange}
          className='border-b border-zinc-600'
        >
          <option value=''>select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <label htmlFor='season'>Season:</label>

        <select
          name='season'
          id='season'
          value={formData.season}
          onChange={handleSelectChange}
          className='border-b border-zinc-600'
        >
          <option value=''>select</option>
          <option value='Spring'>Spring</option>
          <option value='Summer'>Summer</option>
          <option value='Fall'>Fall</option>
          <option value='Winter'>Winter</option>
        </select>
        <label htmlFor='size'>Size:</label>
        <select
          name='size'
          id='size'
          value={formData.size}
          onChange={handleSelectChange}
          className='border-b border-zinc-600'
        >
          <option value=''>select</option>
          <option value='Regular'>Regular</option>
          <option value='Large'>Large</option>
          <option value='Deluxe'>Deluxe</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
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
    </div>
  );
};

export default CreateProduct;
