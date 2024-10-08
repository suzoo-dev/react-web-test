import { ProductsResponse } from "./products";

export const searchProducts = async (
  searchTerm: string
): Promise<ProductsResponse> => {
  const res = await fetch(
    `https://dummyjson.com/products${searchTerm && "/search?q=" + searchTerm}`
  );
  const data = res.json();
  return data;
};
