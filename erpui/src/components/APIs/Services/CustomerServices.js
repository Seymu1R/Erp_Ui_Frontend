import { HttpClient } from "../HttpClient/Index";

class CustomerServices extends HttpClient {
  constructor() {
    super("https://localhost:7192/api/Customers");
  }

  getAllCustomers() {
    return this.getall("GetAllCustomer");
  }
  deleteCustomer(id){
    return this.delete(`DeleteCustomer?customerId=${id}`)
  }
  createCustomer(body){
    return this.post("CreateCustomer", body)
  }
  updateCustomer(body){
    return this.put("UpdateCustomer",body)
  }
  getCustomer(id){
    return this.get(`GetCustomer?customerId=${id}`)
  }
}

export const customerservice = new CustomerServices()
