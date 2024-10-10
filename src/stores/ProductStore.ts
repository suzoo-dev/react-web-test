import { makeAutoObservable } from "mobx";
import { debounce } from "lodash";
import { Product } from "../functions/products";

class ProductStore {
  inputValue: string = "";
  searchTerm: string = "";
  isSearching: boolean = false;
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    this.setSearchTerm = debounce(this.setSearchTerm.bind(this), 800);
  }

  setInputValue = (value: string) => {
    this.inputValue = value;
    this.setSearchTerm(value);
    this.isSearching = true;
  };

  setSearchTerm = (value: string) => {
    this.searchTerm = value;
  };

  setProducts = (products: Product[]) => {
    this.products = products;
    this.isSearching = false;
  };
}

const productStore = new ProductStore();
export default productStore;
