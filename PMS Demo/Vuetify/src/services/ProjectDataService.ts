import http from "../http-common";
import { server } from "../helper";
import authHeader from './auth-header';


class ProjectDataService {
    // Get Details of a project
    getProjectDetails(id: string) {
        return http.get(`${server.baseURL}/projects/${id}`, { headers: authHeader() });
    }
    // Get all Project details
    getAllProjects() {
        return http.get(`${server.baseURL}/projects`, { headers: authHeader() });
    }
    // Get All Tasks in a Project
    getProjectTasks(id: string) {
        return http.get(`${server.baseURL}/projects/only/:id`, { headers: authHeader() });
    }

}
export default new ProjectDataService();