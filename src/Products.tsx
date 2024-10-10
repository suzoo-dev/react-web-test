import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import productStore from "./stores/ProductStore";
import { searchProducts } from "./functions/searchProducts";

const Products = observer(() => {
  const { searchTerm, setSearchTerm, products } = productStore;

  const { isLoading, isError } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => searchProducts(searchTerm),
    retry: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Products</h1>
      <input type="text" onChange={handleSearch} value={searchTerm} />
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
