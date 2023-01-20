import { HttpClient } from "../HttpClient/Index";

class StockService extends HttpClient {
    constructor() {
        super("https://localhost:7110/api/Stocks");
      }

  getStock(id){
    return this.get(`GetStock?stockId=${id}`)
  }

  getAllStocks(){
    return this.getall("GetAllStocks")
  }
  deleteStock(id){
    return this.delete(`DeleteStock?stockId=${id}`)
  }
  createStock(body){
    return this.post("CreateStock", body)
  }
  updateStock(body){
    return this.put("UpdateStock", body)
  }

}

export const stockservices = new StockService()