import { makeAutoObservable } from "mobx";
import { debounce } from "lodash";
import { Product } from "../functions/products";

class ProductStore {
  searchTerm: string = "";
  products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    this.setSearchTerm = debounce(this.setSearchTerm.bind(this), 800);
  }

  setSearchTerm(value: string) {
    this.searchTerm = value;
  }

  setProducts(products: Product[]) {
    this.products = products;
  }
}

const productStore = new ProductStore();
export default productStore;
