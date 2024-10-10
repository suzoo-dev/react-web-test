import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import productStore from "./stores/ProductStore";
import { searchProducts } from "./functions/searchProducts";

const Products = observer(() => {
  const { inputValue, setInputValue, searchTerm, products } = productStore;

  const { isLoading, isError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    retry: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <input
        type="text"
        onChange={handleSearch}
        value={inputValue}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
          borderRadius: "5px",
        }}
      />
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
          {products.map((product) => (
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
});

export default Products;
