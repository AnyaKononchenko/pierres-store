import React from "react";

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
    <div className='flex flex-col gap-3 bg-[#FDC175] w-[90vw] lg:max-w-[70vw] min-h-[80vh] p-3 mt-6 rounded-md'>
      {(items && items.length > 0) ?
        items.map((item, index) => (
          <div
            key={index}
            className='flex justify-center items-center bg-[#EBDD77] w-full border-2 border-[#D68F54]'
          >
            <div className='flex flex-col justify-between items-center bg-[#FDC175] w-full  my-1 mx-1 p-2 border-2 border-[#D68F54]'>
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
