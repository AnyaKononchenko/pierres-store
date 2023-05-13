import React, { useState } from "react";
import { CategoryDocument } from "@customTypes/categories";
import { ProductType } from "@customTypes/products";
import { UserDocument } from "@customTypes/users";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  TbLayoutBottombarCollapse,
  TbLayoutNavbarCollapse,
} from "react-icons/tb";
import ExpandUser from "./expand/ExpandUser";
import ExpandProduct from "./expand/ExpandProduct";
import ExpandCategory from "./expand/ExpandCategory";

const Item = ({
  item,
}: {
  item: CategoryDocument | UserDocument | ProductType;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpandItem = () => {
    setIsExpanded(!isExpanded);
  };

  const ExpandContent = () => {
    console.log("item", item);
    if ("isAdmin" in item) {
      return <ExpandUser user={item} />;
    } else if ("price" in item) {
      return <ExpandProduct product={item} />;
    } else {
      return <ExpandCategory />;
    }
  };

  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <>
      <div className='flex justify-between items-center bg-[#E0CC31] w-full h-full'>
        <div className='flex justify-start items-center gap-2 '>
          {"image" in item ? (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/media/images/${
                "price" in item ? "products" : "users"
              }/${item.image}`}
              alt={item.name}
              className='w-[10%] h-[80%] h-3'
            />
          ) : (
            <div className='w-[3.5rem] h-[3.5rem] bg-[#EBDD77] h-3 border-2 border-zinc-400 rounded-md p-2'>
              <p
                className='w-full h-full font-bold text-[1.3rem] text-center'
                aria-label='Item icon'
              >{`${item.name.charAt(0).toUpperCase()}`}</p>
            </div>
          )}

          <p>{item.name}</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaRegEdit
            size={25}
            aria-label='Edit item'
            className='hover:cursor-pointer'
            onClick={handleEdit}
          />
          <RiDeleteBinFill
            size={25}
            aria-label='Delete item'
            className='hover:cursor-pointer'
            onClick={handleDelete}
          />
          {!isExpanded ? (
            <TbLayoutBottombarCollapse
              size={25}
              aria-label='Info item'
              className='hover:cursor-pointer'
              onClick={handleExpandItem}
            />
          ) : (
            <TbLayoutNavbarCollapse
              size={25}
              aria-label='Info item'
              className='hover:cursor-pointer'
              onClick={handleExpandItem}
            />
          )}
        </div>
      </div>
      <div className={`${isExpanded ? "block" : "hidden"} w-full mt-3`}>
        <ExpandContent />
      </div>
    </>
  );
};

export default Item;
