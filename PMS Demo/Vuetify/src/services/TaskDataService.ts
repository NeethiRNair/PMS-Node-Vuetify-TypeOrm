import http from "../http-common";
import { server } from "../helper";
import authHeader from './auth-header';


class TaskDataService {
    // Get All tasks
    getAllTasks() {
        
        return http.get(`${server.baseURL}/tasks`, { headers: authHeader() });
    }
    // Create a new task
    createTask(task: any) {
        return http.post(`${server.baseURL}/tasks/create`, task ,{ headers: authHeader() });
    }
    // Get a Task Details
    getTask(id: string) {
        
        return http.get(`${server.baseURL}/tasks/${id}`, { headers: authHeader() });
    }
    // Update a Task
    updateTask(id: string, task: any) {
        return http.put(`${server.baseURL}/tasks/${id}`, task ,{ headers: authHeader() });
    }
    // Get all Tasks assigned to an Employee
    assignedToMeTasks(empId: string) {
        return http.get(`${server.baseURL}/tasks/assigned/${empId}`,{ headers: authHeader() })
    }
    // Get all tasks created by that Employee
    createdByMeTasks(empId: string) {
        return http.get(`${server.baseURL}/tasks/created/${empId}`,{ headers: authHeader() })
    }
    



}
export default new TaskDataService();