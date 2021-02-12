<template >
  <v-container fluid class="my-5">
    <v-breadcrumbs :items="[{
                              text: 'Projects',
                              disabled: false,
                            },]">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
    </v-breadcrumbs>
    <v-row class="mx-auto mb-3">
      <v-col cols="12" sm="4" xs="6" v-for="(project, index) in projects" :key="index" >
        <v-card elevation="5"
        class="mx-auto "
        max-width="344"
        >
        <v-card flat class=" cyan--text text--darken-4 grey lighten-4">

          <v-card-title>
            {{ project.name }}
          </v-card-title>
          <v-card-subtitle>
            <div>
              <strong>{{ project.client }}</strong>
            </div>
            <div>
              Manager: 
              {{ project.projectManager.name }}
            </div>
            <div>
               <span class="caption">Members: </span>
              {{ getTotalUsers(project) }}
            </div>
            <div>
              <span class="caption">Tasks: </span>
              {{ getTotalTasks(project) }}
            </div>
          
          </v-card-subtitle>
        </v-card>

          <v-divider></v-divider>
          <v-card-text>

            <v-dialog
            max-width="700"
            v-model="completedDialog"
                        
            >

              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" 
                    v-on="on"
                    @click="getCompletedTasks(project)"
                    >
                  <v-btn fab x-small depressed color="green" class="mr-1 btn"></v-btn>
                  {{ closedTasks(project) }} <span class="caption">Completed Tasks</span>
                </div>
              </template>

              <v-card>
                    <v-card-title class="green lighten-5 green--text text--darken-3">Completed Tasks</v-card-title>
                    <v-simple-table
                        height="200px"
                    >
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Employee
                            </th>
                            <th class="text-left">
                                Task
                            </th>
                            <th class="text-left">
                                End Date
                            </th>
                            <th class="text-left">
                                Phase
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="item in completedTasks"
                            :key="item.id"
                            >
                            <td>{{ item.assignee.name }}</td>
                            <td>{{ item.subject }}</td>
                            <td>{{ formatDate(item.endDate) }}</td>
                            <td>{{ item.phase }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-dialog>
            
            <v-dialog
            max-width="700"
            v-model="upcomingDialog"
                        
            >

              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" 
                    v-on="on"
                    @click="getUpcomingTasks(project)"
                    >
                  <v-btn fab x-small depressed color="orange" class="mr-1 btn"></v-btn>
                  {{ upcomingDeadlineTaks(project) }} <span class="caption">Upcoming Deadlines</span>
                </div>
              </template>

              <v-card>
                    <v-card-title class="deep-orange lighten-5 orange--text text--darken-3">Upcoming Deadlines</v-card-title>
                    <v-simple-table
                        height="200px"
                    >
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">
                                Employee
                            </th>
                            <th class="text-left">
                                Task
                            </th>
                            <th class="text-left">
                                Deadline
                            </th>
                            <th class="text-left">
                                Phase
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="item in upcomingTasks"
                            :key="item.id"
                            >
                            <td>{{ item.assignee.name }}</td>
                            <td>{{ item.subject }}</td>
                            <td>{{ formatDate(item.endDate) }}</td>
                            <td>{{ item.phase }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-dialog>

            <v-dialog
            max-width="700"
            v-model="overdueDialog"
                        
            >

              <template v-slot:activator="{ on, attrs }">
                
                  <div v-bind="attrs" 
                    v-on="on"
                    @click="getOverdueTasks(project)"
                    >
                    <v-btn fab x-small depressed color="red" class="mr-1 btn" ></v-btn>
                    {{ overDue(project) }} <span class="caption">OverDue Tasks</span>
                  </div>

              </template>

              <v-card >
                  <v-card-title class="red lighten-5 red--text text--darken-1">OverDue Tasks</v-card-title>
                  <v-simple-table
                      height="200px"
                  >
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                              OverDue
                          </th>
                          <th class="text-left">
                              Task
                          </th>
                          <th class="text-left">
                              Deadline
                          </th>
                          <th class="text-left">
                              Employee
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                            v-for="item in overdueTasks"
                            :key="item.id"
                        >
                          <td class="red--text"><strong>{{ getOverdueBy(item.endDate) }}</strong></td>                   
                          <td>{{ item.subject }}</td>
                          <td>{{ formatDate(item.endDate) }}</td>
                          <td>{{ item.assignee.name }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
              </v-card>
            </v-dialog>
          </v-card-text>
          <v-divider></v-divider>
          <v-progress-linear
            background-color="blue lighten-5"
            color="blue lighten-1"
            rounded
            stream
            buffer-value="0"
            :value="getProgress(project)"
          ></v-progress-linear>

          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab 
                small 
                v-bind="attrs"
                v-on="on" 
                depressed
                color="blue-grey lighten-5"
                @click="navigateToProjectMembers(project.code)"
                class="mx-2">
                  <v-icon color="purple lighten-1">mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span >Members</span>
            </v-tooltip>
            
            <v-tooltip bottom v-if="currentUserType == 'admin' || project.projectManager.id == currentUserId">
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab 
                small 
                v-bind="attrs"
                v-on="on" 
                depressed
                color="blue-grey lighten-5"
                @click="navigateToDetails(project.code)"
                class="mx-2">
                  <v-icon color="pink lighten-1">mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>Details</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn fab 
                small 
                v-bind="attrs"
                v-on="on" 
                depressed
                color="blue-grey lighten-5"
                @click="navigateToTasks(project.code)"
                class="mx-2">
                  <v-icon color="teal darken-1">mdi-clipboard-list</v-icon>
                </v-btn>
              </template>
              <span>Tasks</span>
            </v-tooltip>


          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectDataService from "../services/ProjectDataService";
import EmployeeDataService from "../services/EmployeeDataService";
import moment from "moment";

@Component({})
export default class ProjectDashboard extends Vue {
  private projectCode: any = [];
  private project: any ={};
  private employees: any = []
  private projects: any =[];
  private tasks: any= [];
  private upcomingTasks: any = [];
  private completedTasks: any = [];
  private overdueTasks: any = [];
  private overdueDialog: any = false;
  private upcomingDialog: any= false;
  private completedDialog: any= false;

  /* Load All Project Details if the user is 'admin' otherwise load only projects for that employee,
  when the component is mounted */
  mounted(){
    if (! this.$store.state.auth.token && !localStorage.getItem('token')) {
      this.$router.push('/');
    }
    else {
      this.currentUserType;
      if ( (this.$store.state.auth.userType).toLowerCase() == 'admin' ) {
          this.retrieveAllProjects();
      }
      else {
        EmployeeDataService.getEmployeeProfile(this.loggedInUserName)
          .then((response) => {
            for(const i of response.worksOn) {
              this.projectCode.push(i.project.code);
              }
            this.retrieveProjectDetails();
          })
      }   
    }
  }
  // Get the logged in username from store
  get loggedInUserName(){ 
      return this.$store.state.auth.userName;
  }
  // Get the logged in user type from store
  get currentUserType(){
    return this.$store.state.auth.userType;
  }
  // Get the logged in user id from store
  get currentUserId(){
    return this.$store.state.auth.employeeId;
  }

  // Get the project details
  retrieveProjectDetails(){    
      for( const i of this.projectCode ) {

        ProjectDataService.getProjectDetails(i.toString())
        .then((response) => { 
            this.projects.push(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
      }   
    }
    // Get the details of all Projects
    retrieveAllProjects(){
        
        ProjectDataService.getAllProjects()
        .then((response) => { 
            this.projects = response.data;    
        })
        .catch((err) => {
            console.log(err)
        })
    }
  // Get the Total number of tasks
  getTotalTasks( project: any) {
    const total: any = project.tasks.length; 
    return String(total).padStart(2, '0');
  }
  // get the number of members in a project
  getTotalUsers(project: any) {
    const users = project.worksOn.length;
    return String(users).padStart(2, '0');
  }
  // Get the Task with Upcoming Deadlines
  upcomingDeadlineTaks(project: any) {
    let count = 0;
    for(const i of project.tasks) {
      if(((Math.floor((new Date().getTime() - new Date(i.endDate).getTime()) / (1000 * 3600 * 24)))<=0) 
                && (i.status != 'closed')) {
                  count += 1;
      }
    }
    return String(count).padStart(2, '0');
  }
  // Get the Closed Tasks
  closedTasks(project: any) {
    let count = 0;
    for(const i of project.tasks) {
      if( i.status == 'closed' ) {
        count += 1;
      }
    }
    return String(count).padStart(2, '0');
  }
  // Get the Overdue Tasks
  overDue(project: any) {
    let count = 0;
    for(const i of project.tasks) {
      if(((Math.floor((new Date().getTime() - new Date(i.endDate).getTime()) / (1000 * 3600 * 24)))>0) 
                && (i.status != 'closed')) {
                  count += 1;
      }
    }
    return String(count).padStart(2, '0');
  }
  // Get the Progress of each project
  getProgress(project: any){
    const count=Number(this.closedTasks(project));
    const totalTasks=Number(this.getTotalTasks(project));
    return count/totalTasks*100;

  }
  // Navigate to Project Tasks Page
  navigateToTasks(projectCode: any) {
        this.$router.push(`/projects/${projectCode}/tasks`);
  }
  // Navigate to Project Memebers  Page
  navigateToProjectMembers(projectCode: any) {
        this.$router.push(`/projects/${projectCode}/employees`);
  }
  // Navigate to Project Details  Page
  navigateToDetails(projectCode: any) {
        this.$router.push(`/projects/${projectCode}`);
  }
  // Get the date in 'Jan 10, 2021' format
  formatDate(date: any) {
        return moment(date).format('ll');
    }

  // Get the Overdue Tasks
  getOverdueTasks(project: any){
    this.overdueTasks=[]
        for( const i of project.tasks ) {
            if(((Math.floor((new Date().getTime() - new Date(i.endDate).getTime()) / (1000 * 3600 * 24)))>0) 
                && (i.status != 'closed')) {
                this.overdueTasks.push(i);
            }
        }
    }
    // Get the Upcoming Tasks
    getUpcomingTasks(project: any){
      this.upcomingTasks=[]
        for( const i of project.tasks ) {
            if(((Math.floor((new Date().getTime() - new Date(i.endDate).getTime()) / (1000 * 3600 * 24)))<=0) 
                && (i.status != 'closed')) {
                this.upcomingTasks.push(i);
            }
        }
    }
    // Get the Overdue By days for each overdue task
    getOverdueBy( date: any ){
        const overdue = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
        if(overdue == 1)
            return `${overdue} Day`;
        else
            return `${overdue} Days`;
    }
    // Get the Closed Tasks Details
    getCompletedTasks( project: any ){
        this.completedTasks=[]
        for( const i of project.tasks ) {
            if( i.status == 'closed' ) {
                this.completedTasks.push(i);
            }
        }
    }
    


}
</script>
<style scoped>
.btn {
  width: 15px;
  height: 15px;
  cursor: auto;
}

</style>
