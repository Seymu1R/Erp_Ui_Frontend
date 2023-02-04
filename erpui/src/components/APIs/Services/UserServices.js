import { HttpClient } from "../HttpClient/Index";

class UsersService extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Users");
  }

  getAllUsers(header) {
    return this.getall("GetAllUsers", header);
  }

  getUser(id) {
    return this.get(`GetUser?userId=${id}`);
  }
  deleteUser(id) {
    return this.delete(`DeleteUser?userId=${id}`);
  }

  createUser(body){
    return this.post("CreateUser", body);
  } 

  editUser( body) {
    return this.put("UptadeUser", body);
  }
  assignRoleToUser(body) {
    return this.post("AssignRoleToUser", body)
  }
}

export const userservice = new UsersService();
