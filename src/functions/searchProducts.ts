import { ProductsResponse } from "./products";
import productStore from "../stores/ProductStore";

export const searchProducts = async (
  searchTerm: string
): Promise<ProductsResponse> => {
  const res = await fetch(
    `https://dummyjson.com/products${searchTerm && "/search?q=" + searchTerm}`
  );
  const data = await res.json();
  productStore.setProducts(data.products);
  return data;
};
