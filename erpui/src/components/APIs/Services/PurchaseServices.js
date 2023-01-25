import { HttpClient } from "../HttpClient/Index";

class PurchaseServices extends HttpClient{
    constructor() {
        super("https://localhost:7110/api/Purchases");
      }

      getPurchase(id) {
        return this.get(`GetPurchase?purchaseId=${id}`);
      }
    
      getAllPurchases(){
        return this.getall("GetAllPurchases")
      }
    
      deletePurchase(id){
        return this.delete(`DeletePurchase?purchaseId=${id}`)
      }
    
      createPurchase(body){
        return this.post("CreatePurchase", body)
      }
    
      updatePurchase(body){
        return this.put("UpdatePurchase", body)
      }
}

export const purchaseservices =  new PurchaseServices()