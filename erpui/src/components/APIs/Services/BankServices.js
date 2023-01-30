import { HttpClient } from "../HttpClient/Index";

class BankServices extends HttpClient{
    constructor() {
        super("https://localhost:7192/api/Banks");
      }
    
      getBank(id) {
        return this.get(`GetBank?bankId=${id}`);
      }
    
      getAllBanks(){
        return this.getall("GetAllBanks")
      }
    
      deleteBank(id){
        return this.delete(`DeleteBank?bankId=${id}`)
      }
    
      createBank(body){
        return this.post("CreateBank", body)
      }
    
      updateBank(body){
        return this.put("UpdateBank", body)
      }
}
export const bankservices = new BankServices();