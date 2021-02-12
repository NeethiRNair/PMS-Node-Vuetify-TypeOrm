import http from "../http-common";
import { server } from "../helper";
import authHeader from './auth-header';


class EmployeeDataService {
  // Get all employees
  getAllEmployees() {
    return http.get(`${server.baseURL}/employees`, {headers: authHeader() })
    .then((response: any) => {
      return response.data;
    })
    .catch((e: any) => {
      console.log(e);
    });
  }
  // get all Employee names
  getAllEmployeesName() {
    return http.get(`${server.baseURL}/employees/only`, {headers: authHeader() })
    .then((response: any) => {
      return response.data;
    })
    .catch((e: any) => {
      console.log(e);
    });
  }
  // Gte Employee details of an employye with given id
  getEmployee(id: string) {
    return http.get(`${server.baseURL}/employees/${id}`, {headers: authHeader() });
  }
  
  // When we access protected resources, the HTTP request needs Authorization header.
  // HTTP header is added with the help of authHeader() function when requesting authorized resource.
  getEmployeeProfile(userName: string){
    return http.post(`${server.baseURL}/employees/profile`, { userName: userName },{headers: authHeader() })
    .then((response: any) => {
      return response.data;
    })
    .catch((e: any) => {
      console.log(e);
    })
  }
  // Update an Employee Details
  updateEmployee(id: string, employee: any) {  
    return http.put(`${server.baseURL}/employees/${id}`, employee ,{ headers: authHeader() });
  }
  // Create a new Employee
  createEmployee(employee: any) {
    return http.post(`${server.baseURL}/employees/create`, employee ,{ headers: authHeader() });
  }
  // delete an employee
  deleteEmployee(id: string) {
    return http.delete(`${server.baseURL}/employees/${id}`,{ headers: authHeader() });
  }

   // Upload File along with the data when creating a new employee or updating an employee
  uploadFileData(formData: FormData, id: string) {
    return http.post(`${server.baseURL}/employees/uploadFileData/${id}`, formData , { headers: {"Authorization":authHeader(), 'Content-Type': 'multipart/form-data'} });
  }

  
}

export default new EmployeeDataService();