import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "./functions/searchProducts";

function Products() {
  const [searchTerm] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    retry: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  console.log("data", data);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          alignItems: "start",
          overflow: "auto",
          textAlign: "left",
          height: "600px",
        }}
      >
        <ul>
          {data?.products.map((product) => (
            <li
              key={product.id}
              style={{ borderBottom: "1px solid #ccc", margin: "10px" }}
            >
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
