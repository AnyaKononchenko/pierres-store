import { CategoryDocument } from "@customTypes/categories";
import { CategoryForm } from "components";
import React from "react";

const emptyForm: CategoryDocument = {
  _id: "",
  name: "",
};

const CreateCategory = () => {
  return <CategoryForm variant='create' initialState={emptyForm} />;
};

export default CreateCategory;