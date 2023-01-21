import { HttpClient } from "../HttpClient/Index";

class VariationServices extends HttpClient{
    constructor() {
        super("https://localhost:7004/api/Variations");
      }
    
      getVariation(id) {
        return this.get(`GetVariationById?variationId=${id}`);
      }
    
      getAllVariations(){
        return this.getall("GetAllVariations")
      }
    
      deleteVariation(id){
        return this.delete(`DeleteVariation?variationId=${id}`)
      }
    
      createVariation(body){
        return this.post("CreateVariation", body)
      }
    
      updateVariation(body){
        return this.put("UpdateVariation", body)
      }
}

export const variationservices = new VariationServices()