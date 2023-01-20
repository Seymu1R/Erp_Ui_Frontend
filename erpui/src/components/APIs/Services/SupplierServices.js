import { HttpClient } from "../HttpClient/Index";

class SupplierServices extends HttpClient {
  constructor() {
    super("https://localhost:7192/api/Suppliers");
  }

  getAllSuppliers() {
    return this.getall("GetAllSuppliers");
  }
  
  deleteSupplier(id){
    return this.delete(`DeleteSupplier?supplierId=${id}`)
  }
  createSupplier(body){
    return this.post("CreateSupplier", body)
  }
  getSupplier(id){
    return this.get(`GetSupplierById?supplierId=${id}`)
  }
  updateSupplier(body){
    return this.put('UpdateSupplier', body)
  }

}

export const supplierservices = new SupplierServices()