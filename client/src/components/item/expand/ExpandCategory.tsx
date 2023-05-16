import React from "react";

import CategoryForm from "components/category/CategoryForm";
import { CategoryDocument } from "@customTypes/categories";

const ExpandCategory = ({
  category,
  isEdit,
}: {
  category: CategoryDocument;
  isEdit: boolean;
}) => {
  return (
    <>
      {!isEdit ? (
        <p>
          Products in category: <span>#</span>
        </p>
      ) : (
        <CategoryForm variant='edit' initialState={category} />
      )}
    </>
  );
};

export default ExpandCategory;
