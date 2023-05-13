import React, { useState } from "react";

import { CategoryDocument } from "@customTypes/categories";
import { ProductType } from "@customTypes/products";
import { UserDocument } from "@customTypes/users";
import Item from "./Item";

type ItemType = UserDocument | ProductType | CategoryDocument;

const ItemsList = ({ items }: { items: ItemType[] }) => {
  return (
    <div className='flex flex-col gap-3 bg-[#E0CC31] w-full min-h-[80vh] p-3 mt-6 rounded-md'>
      {items &&
        items.map((item, index) => (
          <div className='flex justify-center items-center bg-[#EBDD77] w-full border-2 border-zinc-400'>
            <div className='flex flex-col justify-between items-center bg-[#E0CC31] w-full  my-1 mx-1 p-2 border-2 border-zinc-400'>
              <Item key={index} item={item} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemsList;
