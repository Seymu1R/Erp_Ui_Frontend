import { HttpClient } from "../HttpClient/Index";

class RoleServices extends HttpClient {
  constructor() {
    super("https://localhost:7149/api/Roles");
  }

  getAllRoles(config) {
    return this.getall("GetAllRoles", config);
  }
  deleteRole(id, config) {
    return this.delete(`DeleteRole?roleId=${id}`, config);
  }
  getRoleUser(username){
    return this.get(`GetRolesToUser?Username=${username}`)
  }

}

export const roleservice = new RoleServices()
