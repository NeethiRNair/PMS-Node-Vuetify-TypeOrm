import {getConnection, getRepository} from "typeorm";
import { Task } from "../entity/task.entity";

export class TaskController {
   
    //Get Project Details
    static getTaskDetails = async (taskId) => {
        try{

            const task = await getRepository(Task)
            .createQueryBuilder("task")
            .leftJoinAndSelect("task.project", "project")
            .leftJoinAndSelect("task.assignee", "employee")
            .leftJoinAndSelect("task.createdBy", "createdByEmployee")
            .where("task.id = :id", { id: taskId })
            .getOne()
            return task;
        }
        catch(error) {
            throw 'Task Not Found'
        }   
    }

    // Update a Task
    static updateTask = async (taskId, data) => {
        try {
          const department = await getRepository(Task)
            .createQueryBuilder("task")
            .update(Task)
            .set( data )
            .where("id = :id", { id: taskId })
            .execute();
            return department;
              
        }catch(err){
          throw 'Task Not Found'
        }
    }
    
    // Get all Tasks assigned to an employee
    static assignedToMeTasks = async (empId) => {
        try {

            const tasks = await getRepository(Task)
            .createQueryBuilder("task")
            .leftJoinAndSelect("task.project", "project")
            .leftJoinAndSelect("task.assignee", "assignee")
            .where("task.assignee = :assignee", { assignee: empId })
            .getMany();
            return tasks;
        }
        catch(err){
            throw 'Task Not Found'
        }
    }
    
      // Get all Tasks created by an employee
    static createdByMeTasks = async (empId) => {
          try {

              const tasks = await getRepository(Task)
              .createQueryBuilder("task")
              .leftJoinAndSelect("task.project", "project")
              .leftJoinAndSelect("task.createdBy", "createdBy")
              .where("task.createdBy = :createdBy", { createdBy: empId })
              .getMany();
              return tasks;
          }
        catch(err){
            throw 'Task Not Found'
          }
    }

    // Adds a new Task
    static createTask = async (task : Task) => {
        try {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Task)
            .values( task )
            .execute();
            
            return task;

            }catch(err){
            throw 'Failed to add a new Task'
            }
        }

      
}
export default TaskController;
