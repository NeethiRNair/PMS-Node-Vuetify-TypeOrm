import {getConnection, getRepository} from "typeorm";
import { Department } from "../entity/department.entity";

export class DepartmentController {

    //Displays all departments with their employees.
    static getAllDepartments =  async ()  => {
        const departments = await getRepository(Department)
        .createQueryBuilder("department")
        .leftJoinAndSelect("department.employees", "employee")
        .leftJoinAndSelect("employee.authDetails", "authDetails")
        .getMany();
        return departments;   
    }

    //Displays a department with its employees.
    static getDepartment = async (dept_id) => {
        try {

            const department =  await getRepository(Department)
            .createQueryBuilder("department")
            .leftJoinAndSelect("department.employees", "employee")
            .leftJoinAndSelect("employee.authDetails", "authDetails")
            .leftJoinAndSelect("employee.worksOn", "worksOn")
            .leftJoinAndSelect("worksOn.project", "project")
            .where("department.id = :id", { id: dept_id })
            .getOne()
            return department;
            
        }
        catch( error) {
          throw 'Department Not Found'
        }
    }
     // Get only Departments details for listing them
    static getDepartmentsOnly = async () => {
      try {
        const departments = await getRepository(Department)
          .createQueryBuilder("department")
          .getMany();
        return departments; 
      }
      catch(err){
        throw 'Departments Not Fopund'
      }   
  }
   // Adds a new Department
   static createDepartment = async (department : Department)=> {
    try {
      return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Department)
      .values( department )
      .execute();
      //return await this.departmentRepository.save(department)
      }catch(err){
        throw 'Failed to add department'
      }
}
  
      // Update a Department
      static updateDepartment = async (dept_id, data) => {
        try {
          if (dept_id) {
            const department = await getRepository(Department)
            .createQueryBuilder("department")
            .update(Department)
            .set(
              data)
            .where("id = :id", { id: dept_id })
            .execute();
            return department;
          }
          else {
            throw "Department Not Found";
          }
          
        }catch(err){
          throw 'Failed to Update Department';
        }
    }
  
    //Delete a Department
    static deleteDepartment = async (deptId) => {
        try {
          const department = await getRepository(Department)
          .createQueryBuilder("department")
          .delete()
          .from(Department)        
          .where("id = :id", { id: deptId })
          .execute();
        }
        catch(err){
          throw 'Department Not Fopund'
        }
    }
 
  
}
export default DepartmentController;