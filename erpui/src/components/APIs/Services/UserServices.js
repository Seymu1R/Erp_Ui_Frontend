import { HttpClient } from "../HttpClient/Index";



class UsersService extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Users");
  }

  getAllUsers(config) {
    return this.getall("GetAllUsers", config);
  }

  getUser(id) {
    return this.get(`GetUser?userId=${id}`);
  }
  deleteUser(id, config) {
    return this.delete(`DeleteUser?userId=${id}`, config);
  }

  createUser(body){
    return this.post("CreateUser", body);
  } 

  editUser( body) {
    return this.put("UptadeUser", body);
  }
  assignRoleToUser(body, config) {
    return this.post("AssignRoleToUser", body, config)
  }
}

export const userservice = new UsersService();
