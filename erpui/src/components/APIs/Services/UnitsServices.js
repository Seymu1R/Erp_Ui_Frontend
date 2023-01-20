import { HttpClient } from "../HttpClient/Index";

class UnitsServices extends HttpClient{
    constructor() {
        super("https://localhost:7004/api/Units");
      }
    
      getUnit(id) {
        return this.get(`GetUnitById?unitid=${id}`);
      }
    
      getAllUnits(){
        return this.getall("GetAllUnits")
      }
    
      deleteUnit(id){
        return this.delete(`DeleteUnit?unitid=${id}`)
      }
    
      createUnit(body){
        return this.post("CreateUnit", body)
      }
    
      updateUnit(body){
        return this.put("UpdateUnit", body)
      }
}

export const unitservices = new UnitsServices()