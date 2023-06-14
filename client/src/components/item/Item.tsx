import React, { useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  TbLayoutBottombarCollapse,
  TbLayoutNavbarCollapse,
} from "react-icons/tb";

import { CategoryDocument } from "@customTypes/categories";
import { ProductWithCategory } from "@customTypes/products";
import { UserDocument } from "@customTypes/users";
import { ExpandUser, ExpandProduct, ExpandCategory } from "./expand";

import { ItemType } from "@customTypes/common";

const Item = ({
  item,
  onDelete,
}: {
  item: CategoryDocument | UserDocument | ProductWithCategory;
  onDelete: (item: ItemType) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleExpandItem = () => {
    if (isEdit && isExpanded) setIsEdit(false);
    setIsExpanded(!isExpanded);
  };

  const ExpandContent = () => {
    if ("isAdmin" in item) {
      return <ExpandUser user={item} />;
    } else if ("price" in item) {
      return <ExpandProduct product={item} isEdit={isEdit} />;
    } else {
      return (
        <ExpandCategory category={item as CategoryDocument} isEdit={isEdit} />
      );
    }
  };

  const handleDelete = (item: ItemType) => {
    onDelete(item);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className='flex justify-between items-center bg-[#FDC175] w-full h-full'>
        <div className='flex justify-start items-center gap-2 '>
          {"image" in item ? (
            <img
              src={`${process.env.REACT_APP_BASE_URL}/media/images/${
                "price" in item ? "products" : "users"
              }/${item.image}`}
              alt={item.name}
              className='w-[3.5rem] h-[3.5rem]'
            />
          ) : (
            <div className='w-[3.5rem] h-[3.5rem] bg-[#EBDD77] border-2 border-[#D68F54] rounded-md p-2'>
              <p
                className='w-full h-full font-bold text-[1.3rem] text-center'
                aria-label='Item icon'
              >{`${item.name.charAt(0).toUpperCase()}`}</p>
            </div>
          )}

          <p>{item.name}</p>
        </div>
        <div className='flex items-center gap-2'>
          {!("isAdmin" in item) && (
            <FaRegEdit
              size={25}
              aria-label='Edit item'
              className={`hover:cursor-pointer ${isEdit && "animate-pulse"}`}
              onClick={handleEdit}
            />
          )}
          <RiDeleteBinFill
            size={25}
            aria-label='Delete item'
            className='hover:cursor-pointer'
            onClick={() => handleDelete(item)}
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
