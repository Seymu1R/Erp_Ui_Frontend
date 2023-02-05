import axios from "axios";

export class HttpClient {
    baseUrl;
  
    constructor(url) {
      this.baseUrl = url;
    }
  
    async get(endpoint, headers) {
      return await axios.get(`${this.baseUrl}/${endpoint}`, headers);
    }
    async getall(endpoint, headers) {
        return await axios.get(`${this.baseUrl}/${endpoint}`, headers);
    } 
    async delete(endpoint, headers) {
        return await axios.delete(`${this.baseUrl}/${endpoint}`, headers);
      }
    async post(endpoint, body, headers) {
      return await axios.post(`${this.baseUrl}/${endpoint}`,body, headers);
    }
    async put(endpoint, body, headers) {
      return await axios.put(`${this.baseUrl}/${endpoint}`,body, headers);
    }     
  }