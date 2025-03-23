import BackendAdapter from "../../adapter/models/adapter";
import { ProductListType, ProductType } from "../../adapter/models/products";

export default class SQLiteDB implements BackendAdapter {
  constructor() {
    //Init database here
  }

  getProduct(): ProductType {
    const objMock = {
      amount: 0.0,
      name: "test",
      description: "Test Description",
    };

    return objMock;
  }

  getProducts(): ProductListType {
    return [];
  }
}
