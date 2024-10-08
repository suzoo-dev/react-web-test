import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "./functions/searchProducts";
import { useState } from "react";

function Products() {
  const [searchTerm] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => searchProducts(searchTerm),
  });

  console.log("data", data);

  return <p>Products</p>;
}

export default Products;
