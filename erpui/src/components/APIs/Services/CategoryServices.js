import { HttpClient } from "../HttpClient/Index";

class CategoryServices extends HttpClient {
  constructor() {
    super("https://localhost:7004/api/Categories");
  }

  getCategory(id) {
    return this.get(`GetCategoryById?categoryId=${id}`);
  }

  getAllCategories() {
    return this.getall("GetAllCategories");
  }

  deleteCategory(id) {
    return this.delete(`DeleteCategory?categoryId=${id}`);
  }

  createCategory(body) {
    return this.post("CreateCategory", body);
  }

  updateCategory(body) {
    return this.put("UpdateCategory", body);
  }
}

export const categoriesservices = new CategoryServices();
