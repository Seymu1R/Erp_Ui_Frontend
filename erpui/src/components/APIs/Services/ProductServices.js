import { HttpClient } from "../HttpClient/Index";

class ProductServices extends HttpClient {
  constructor() {
    super("https://localhost:7004/api/Products");
  }

  getProduct(id) {
    return this.get(`GetProductById?producId=${id}`);
  }

  getAllpRoducts() {
    return this.getall("GetAllProduct");
  }

  deleteProduct(id) {
    return this.delete(`DeleteProduct?producId=${id}`);
  }

  createProduct(body) {
    return this.post("CreateProduct", body);
  }

  updateProduct(body) {
    return this.put("UpdateProduct", body);
  }
}
export const productservices = new ProductServices()