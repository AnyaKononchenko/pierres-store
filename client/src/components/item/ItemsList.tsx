import React, { useState } from "react";

import Item from "./Item";
import { ItemType } from "@customTypes/common";


const ItemsList = ({
  items,
  onDelete,
}: {
  items: ItemType[];
  onDelete: (item: ItemType) => void;
}) => {
  return (
    <div className='flex flex-col gap-3 bg-[#E0CC31] w-full min-h-[80vh] p-3 mt-6 rounded-md'>
      {(items && items.length > 0) ?
        items.map((item, index) => (
          <div
            key={index}
            className='flex justify-center items-center bg-[#EBDD77] w-full border-2 border-zinc-400'
          >
            <div className='flex flex-col justify-between items-center bg-[#E0CC31] w-full  my-1 mx-1 p-2 border-2 border-zinc-400'>
              <Item
                key={"_id" in item ? item?._id : items.length + index}
                item={item}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))
      : <article className="mx-auto">Nothing to show</article>}
    </div>
  );
};

export default ItemsList;
