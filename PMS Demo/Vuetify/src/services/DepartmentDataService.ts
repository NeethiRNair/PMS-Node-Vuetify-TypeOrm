import http from "../http-common";
import { server } from "../helper";
import authHeader from './auth-header';


class DepartmentDataService {
  // Get all the departments details
  getAll() {
    return http.get(`${server.baseURL}/departments`, { headers: authHeader() });
  }
  // Get the Department Details only
  getAllDepartmentsOnly() {
    console.log("departments")
    return http.get(`${server.baseURL}/departments/only`, { headers: authHeader() });
  }
  // Get a Department and its details
  getDepartment(id: string) {
    return http.get(`${server.baseURL}/departments/${id}`, { headers: authHeader() });
  }
  // Update a Department
  updateDepartment(id: string, department: any) {
    
    return http.put(`${server.baseURL}/departments/${id}`, department ,{ headers: authHeader() });
  }
  // Create a new Department
  createDepartment(department: any) {
    return http.post(`${server.baseURL}/departments/create`, department,{ headers: authHeader() });
  }
  // Delete a Department
  deleteDepartment(id: string) {
    return http.delete(`${server.baseURL}/departments/${id}`,{ headers: authHeader() });
  }
  // Upload File along with the data when creating a new department or updating a department
  uploadFileData(formData: FormData, id: string) {
    
    return http.post(`${server.baseURL}/departments/uploadFileData/${id}`, formData , { headers: {"Authorization":authHeader(), 'Content-Type': 'multipart/form-data'}});
  }
} 

export default new DepartmentDataService();