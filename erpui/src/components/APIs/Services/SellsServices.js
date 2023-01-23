import { HttpClient } from "../HttpClient/Index";

class SellServices extends HttpClient{
    constructor() {
        super("https://localhost:7110/api/Sells");
      }

      getSell(id) {
        return this.get(`GetSell?sellId=${id}`);
      }
    
      getAllSells(){
        return this.getall("GetAllSells")
      }
    
      deleteSell(id){
        return this.delete(`DeleteSell?sellId=${id}`)
      }
    
      createSell(body){
        return this.post("CreateSell", body)
      }
    
      updateSell(body){
        return this.put("UpdateSell", body)
      }


}

export const sellservices = new SellServices()