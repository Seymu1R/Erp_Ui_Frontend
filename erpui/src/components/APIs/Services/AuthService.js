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
  forgetPassword(body) {
    return this.post("ForgetPassword", body);
  }
  resetPassword(body) {
    return this.post("ResetPassword", body);
  }
}

export const authservices = new AuthServices()