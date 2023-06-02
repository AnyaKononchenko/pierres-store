import { ProductDocument, Quality } from "@customTypes/products";
import { ProductForm } from "components";

const emptyForm: ProductDocument = {
  name: "",
  description: "",
  price: 1,
  inStock: 0,
  quality: Quality.regular,
  sold: 0,
  category: "",
  season: [],
};

const CreateProduct = () => {
  return <ProductForm variant='create' initialState={emptyForm} />;
};

export default CreateProduct;
