import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import productStore from "./stores/ProductStore";
import { searchProducts } from "./functions/searchProducts";
import { addRetries } from "./functions/addRetries";

const Products = observer(() => {
  const { inputValue, setInputValue, isSearching, searchTerm, products } =
    productStore;

  const { isLoading, isFetching, isError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => addRetries(searchProducts)(searchTerm),
    retry: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearSearch = () => {
    setInputValue("");
  };

  if (isError) return <p>Error</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <input
        type="text"
        onChange={handleSearch}
        value={inputValue}
        style={{
          margin: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
          borderRadius: "5px",
        }}
      />
      {(isLoading || isFetching || isSearching) && <span>...</span>}
      <button style={{ margin: "10px" }} onClick={clearSearch}>
        Clear
      </button>
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
