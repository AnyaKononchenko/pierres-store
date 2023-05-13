import { ProductType, Quality } from "@customTypes/products";
import React, { useState } from "react";

const emptyForm: ProductType = {
  name: "",
  image: "",
  description: "",
  price: 1,
  inStock: 0,
  quality: Quality.regular,
  sold: 0,
  category: "",
};

const CreateProduct = () => {
  const [formData, setFormData] = useState(emptyForm);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [ event.target.name]: event.target.value,
    // }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [ event.target.name]: event.target.value,
    // }));
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    // Do something with the form data, such as submitting it to an API or handling it in your application
    console.log(formData);
    // Reset the form after submission
    // setFormData(emptyForm);
  };

  return (
    <div className="flex flex-col items-center p-2">
      <h2 className="font-bold text-[1.5rem] my-6">CreateProduct</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          Image:
          <input
            type='file'
            name='image'
            value={formData.image}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          Description:
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            className='border border-zinc-600'
          ></textarea>
        </label>
        <label>
          Price:
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          In Stock:
          <input type='number' name='inStock' onChange={handleInputChange} className='border-b border-zinc-600' />
          
        </label>
        <label>
          Quality:
          <select
            name='quality'
            value={formData.quality}
            onChange={handleSelectChange}
          >
            <option value=''>Select</option>
            <option value='high'>High</option>
            <option value='medium'>Medium</option>
            <option value='low'>Low</option>
          </select>
        </label>
        <label>
          Sold:
          <input
            type='number'
            name='sold'
            value={formData.sold}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          Category:
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          Season:
          <input
            type='text'
            name='season'
            value={formData.season}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <label>
          Size:
          <input
            type='text'
            name='size'
            value={formData.size}
            onChange={handleInputChange}
            className='border-b border-zinc-600'
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
