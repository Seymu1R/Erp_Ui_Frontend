import { HttpClient } from "../HttpClient/Index";

class AuthServices extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Auths");
  }

  createToken(body) {
    return this.post("LoginUser", body);
  }
  createRefreshToken(body) {
    return this.post("CreateRefreshToken", body);
  }
}

export const authservices = new AuthServices()