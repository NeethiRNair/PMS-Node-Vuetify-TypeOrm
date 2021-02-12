import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Project} from "../entity/project.entity";

export class ProjectController {

    // Get the project details with a given project code
    static getProjectDetails = async (projectCode) => {
      try {

        const project = await getRepository(Project)
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.projectManager", "employeeManager")
        .leftJoinAndSelect("project.worksOn", "worksOn")
        .leftJoinAndSelect("worksOn.employee", "employee")
        .leftJoinAndSelect("project.tasks", "task")
        .leftJoinAndSelect("task.assignee", "employeeAssignee")
        .leftJoinAndSelect("task.createdBy", "employeeCreated")
        .where("project.code = :code", { code: projectCode })
        .getOne()

       return project ;
      }
      catch(error) {
        throw 'Task Not Found'
      }     
    }

    // get All Projects
    static getAllProjects = async () => {
      try {

        const projects =  await getRepository(Project)
          .createQueryBuilder("project")
          .leftJoinAndSelect("project.projectManager", "employeeManager")
          .leftJoinAndSelect("project.worksOn", "worksOn")
          .leftJoinAndSelect("worksOn.employee", "employee")
          .leftJoinAndSelect("project.tasks", "task")
          .leftJoinAndSelect("task.assignee", "employeeAssignee")
          .leftJoinAndSelect("task.createdBy", "employeeCreated")
          .getMany()
          return projects;
      }
      catch (errror) {
        throw 'Tasks Not Found'
      }
    }
}

export default ProjectController;