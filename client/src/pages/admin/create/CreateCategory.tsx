import React from "react";

import { CategoryDocument } from "@customTypes/categories";
import { CategoryForm } from "components";


const emptyForm: CategoryDocument = {
  _id: "",
  name: "",
};

const CreateCategory = () => {
  return <CategoryForm variant='create' initialState={emptyForm} />;
};

export default CreateCategory;
