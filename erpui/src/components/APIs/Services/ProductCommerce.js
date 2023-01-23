import { HttpClient } from "../HttpClient/Index";

class ProductCommerceServices extends HttpClient {
  constructor() {
    super("https://localhost:7110/api/ProductCommers");
  }

  GetProductCommerce(id) {
    return this.get(`GetProductCommerce?productcommerceId=${id}`);
  }

  getAllProductCommerce() {
    return this.getall("GetAllProductCommerces");
  }

  deleteProductCommerce(id) {
    return this.delete(`DeleteProductCommerce?productcommerceId=${id}`);
  }

  createProductCommerce(body) {
    return this.post("CreateProductCommerce", body);
  }

  updateProductCommerce(body) {
    return this.put("UpdateProductCommerce", body);
  }
}

export const productcommerceservices = new ProductCommerceServices()
