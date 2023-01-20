import axios from "axios";

export class HttpClient {
    baseUrl;
  
    constructor(url) {
      this.baseUrl = url;
    }
  
    async get(endpoint) {
      return await axios.get(`${this.baseUrl}/${endpoint}`);
    }
    async getall(endpoint) {
        return await axios.get(`${this.baseUrl}/${endpoint}`);
    } 
    async delete(endpoint) {
        return await axios.delete(`${this.baseUrl}/${endpoint}`);
      }
    async post(endpoint, body) {
      return await axios.post(`${this.baseUrl}/${endpoint}`,body);
    }
    async put(endpoint, body) {
      return await axios.put(`${this.baseUrl}/${endpoint}`,body);
    }  
   
  }