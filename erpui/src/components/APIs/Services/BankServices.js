import { HttpClient } from "../HttpClient/Index";

class BankServices extends HttpClient{
    constructor() {
        super("https://localhost:7192/api/Banks");
      }
    
      getBank(id, config) {
        return this.get(`GetBank?bankId=${id}`, config);
      }
    
      getAllBanks(config){
        return this.getall("GetAllBanks", config)
      }
    
      deleteBank(id, config){
        return this.delete(`DeleteBank?bankId=${id}`, config)
      }
    
      createBank(body, config){
        return this.post("CreateBank", body, config)
      }
    
      updateBank(body, config){
        return this.put("UpdateBank", body, config)
      }
}
export const bankservices = new BankServices();