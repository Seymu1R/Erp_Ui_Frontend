import { HttpClient } from "../HttpClient/Index";

class DiscountsServices extends HttpClient{

    constructor() {
        super("https://localhost:7110/api/Discounts");
      }
    
      getDiscount(id) {
        return this.get(`GetDiscount?discountId=${id}`);
      }
    
      getAllDiscounts(){
        return this.getall("GetAllDiscounts")
      }
    
      deleteDiscount(id){
        return this.delete(`DeleteDiscount?discountId=${id}`)
      }
    
      createDiscount(body){
        return this.post("CreateDiscount", body)
      }
    
      updateDiscount(body){
        return this.put("UpdateDiscount", body)
      }
}

export const discountservices = new DiscountsServices()