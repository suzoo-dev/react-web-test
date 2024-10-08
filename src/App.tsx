import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./Products";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Products />
      </QueryClientProvider>
    </>
  );
}

export default App;
