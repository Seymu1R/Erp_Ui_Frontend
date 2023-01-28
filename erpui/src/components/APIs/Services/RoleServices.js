import { HttpClient } from "../HttpClient/Index";

class RoleServices extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Roles");
  }

  getAllRoles() {
    return this.getall("GetAllRoles");
  }
  deleteRole(id) {
    return this.delete(`DeleteRole?roleId=${id}`);
  }
  getRoleUser(username){
    return this.get(`GetRolesToUser?Username=${username}`)
  }

}

export const roleservice = new RoleServices()
