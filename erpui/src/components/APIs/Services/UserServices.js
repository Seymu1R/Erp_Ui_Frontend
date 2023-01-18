import { HttpClient } from "../HttpClient/Index";

class UsersService extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Users");
  }

  getAllUsers() {
    return this.getall("GetAllUsers");
  }

  getUser(id) {
    return this.get(`GetUser?userId=${id}`);
  }
  deleteUser(id) {
    return this.delete(`DeleteUser?userId=${id}`);
  }
  postNewPosts(body) {
    return this.post("posts", body);
  }

  editPost(id, body) {
    return this.put("posts", body, id);
  }
}

export const userservice = new UsersService();
