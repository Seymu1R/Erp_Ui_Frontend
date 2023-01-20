import { HttpClient } from "../HttpClient/Index";

class BrandsServices extends HttpClient {
  constructor() {
    super("https://localhost:7004/api/Brands");
  }

  getBrand(id) {
    return this.get(`GetBrandById?brandId=${id}`);
  }

  getAllBrands(){
    return this.getall("GetAllBrands")
  }

  deleteBrand(id){
    return this.delete(`DeleteBrand?brandId=${id}`)
  }

  createBrand(body){
    return this.post("CreateBrand", body)
  }

  updateBrand(body){
    return this.put("UpdateBrand", body)
  }

}


export const brandservices = new BrandsServices()
