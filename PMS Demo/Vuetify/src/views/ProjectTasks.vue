<template >
    <v-container fluid class="my-5">

        <v-dialog
        max-width="500"
            v-model="dialog"
            persistent                    
            >

            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                aria-hidden="true"                
                fab
                dark
                fixed
                bottom
                right
                color="cyan"
                v-bind="attrs"
                v-on="on"
                
                >
                    <v-icon dark >
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>

            <v-card >
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>                                                   
                            <v-col cols="12">
                                <v-text-field
                                    label="Subject"
                                    v-model="editedTask.subject"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                name="input-7-1"
                                label="Description" 
                                v-model="editedTask.description"
                                no-resize
                                rows="2"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      :items="status"
                                      v-model="editedTask.status"
                                      label="Status"
                                      item-text="text"
                                      item-value="value"
                                      single-line
                                    ></v-select>         
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      :items="priority"
                                      v-model="editedTask.priority"
                                      label="Priority"
                                      item-text="text"
                                      item-value="value"
                                      single-line
                                    ></v-select>         
                            </v-col>
                            <v-col cols="12">
                                 <v-select
                                      :items="employees"
                                      label="Assignee" 
                                      v-model="editedTask.assignee"
                                      item-text="name"
                                      item-value="id"
                                      single-line
                                    ></v-select>  
                                
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      :items="phases"
                                      v-model="editedTask.phase"
                                      label="Phase"
                                      item-text="text"
                                      item-value="value"
                                      single-line
                                    ></v-select>         
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="6">
                                <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="getFormattedDate"
                                        label="Start Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    @input="menu = false"
                                    ></v-date-picker>
                                </v-menu>
                              
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="saveTask()"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-breadcrumbs :items="[
                                {
                                    text: project.name,
                                    disabled: false,
                                },
                                {
                                    text: 'Tasks',
                                    disabled: false,
                                }]">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        
        <v-row class="mb-3">
            <v-col cols="12" sm="3" v-for="(status, index) in status" :key="index" >
                <v-card >

                    <v-card-title class="cyan--text text--darken-4 grey lighten-3">
                        {{ status.text }}
                    </v-card-title>
                    <v-divider></v-divider> 
                    <v-card 
                    v-for="(task, index) in project.tasks" :key="index" 
                    flat>
                        <div v-for="(phase, index) in phases" :key="index">
                            <div v-if="phase.value == task.phase">
                                <v-expansion-panels accordion hover v-if="task.status == status.value">
                                    <v-expansion-panel>
                                        <v-expansion-panel-header  >
                                        <span >{{ task.subject }}</span>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row class="mx-auto mb-1">

                                            <span>{{ task.description }}</span> 
                                            <!-- <v-spacer></v-spacer> -->
                                            <v-icon dense color="blue" class="ml-auto" @click="navigateToTaskDetails(task.id)">mdi-information-outline</v-icon>
                                            </v-row>
                                            <v-chip class="cyan--text text--darken-4" >
                                                {{ phase.text }}
                                            </v-chip> 
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </div>
                    </v-card>            
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import ProjectDataService from "../services/ProjectDataService";
import TaskDataService from "../services/TaskDataService";

@Component({})
export default class ProjectTasks extends Vue { 
    private id: any='';
    private progress: any= 0;
    private project: any ={};
    private tasks: any = [];
    private employees: any = [];
    private editedIndex = -1;
    private editedTask: any = {};
    private file!: File ; // Definite Assignment Assertion (!)
    private date: any =new Date().toISOString().substr(0, 10);
    private dialog = false;
    private defaultItem= {};
    private menu= false;
    private phases: any = [
        { text: 'Planning', value: 'planning', color:'amber' },
        { text: 'Design', value: 'design', color:'pink' },
        { text: 'Development', value: 'development', color:'indigo' },
        { text: 'Testing', value: 'testing', color:'lime' }
    ];
    private status: any = [
        { text: 'New', value: 'new', color:'deep-orange' },
        { text: 'In Progress', value: 'inProgress', color:'cyan' },
        { text: 'Resolved', value: 'resolved', color:'purple' },
        { text: 'Closed', value: 'closed', color:'green' }
    ];
    private priority= [
          { text: 'Normal', value: 'normal' },
          { text: 'Low', value: 'low' },
          { text: 'High', value: 'high' }
    ];

    // Get the date in 'Jan 10, 2021' format
    getDate(date: string) {
        return moment(date).format('ll');
    }
    
    //Set the Form title to New or edit
    get formTitle () {
        return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
    }
    // Set the date to 'Jan 10, 2021' format
    get getFormattedDate() {
        return moment(this.date).format('ll');
    }
    // Set date format to JavaScript date format before inserting to database
    setEndDate(){
        this.editedTask.startDate = moment(this.date);
        this.editedTask.endDate = moment(this.editedTask.startDate).add(7,'d');
    }
    // Load Project Details when the component is mounted
    mounted() {
        if (! this.$store.state.auth.token && !localStorage.getItem('token')) {
        this.$router.push('/');
        }
        else {
            this.currentUserType;
            this.retrieveProjectDetails();
        }
    }
    // get the current User Type
    get currentUserType(){
        return this.$store.state.auth.userType;
    }

    // Get the Project Details
    retrieveProjectDetails(){
        this.id = this.$route.params.id;
        ProjectDataService.getProjectDetails(this.id.toString())
        .then((response) => { 
            this.project = response.data;
            this.tasks = response.data.tasks;
            for( let i=0; i<response.data.worksOn.length; i++) {                
                this.employees.push(response.data.worksOn[i].employee)
            }            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // Get the Total number of tasks
    getTotalTasks() {
        const total: any = this.project.tasks.length;  
        return String(total).padStart(2, '0');
    }
    // Get the Closed Tasks Details
    closedTasks() {
        let count = 0;
        for(const i of this.project.tasks) {
        if( i.status == 'closed' ) {
            count += 1;
        }
        }
        return String(count).padStart(2, '0');
    }
    // Get the Progress of each project
    getProgress(){
        const count=Number(this.closedTasks());
        const totalTasks=Number(this.getTotalTasks());
        console.log(count/totalTasks);
        return count/totalTasks*100;

    }
    // Get the progress in each of the phases
    getPhaseProgress(phase: any) {
        let count=0;
        let totalTasks = 0;
        for(const i of this.project.tasks) {
            if ( i.phase == phase ) {
                totalTasks+=1;
                if ( i.status == 'closed' ) {
                    count += 1;
                }
            }
        }
        this.progress = count/totalTasks*100;
        console.log(count/totalTasks *100);
        return count/totalTasks *100;
    }
    // Navigate to Task details Page
    navigateToTaskDetails(code: any){
        this.$router.push(`/task/${code}`)
    }
    // Close the Dialog box anfd reset the form
    close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedTask = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
    }
    // Save the New Task
    saveTask() {
        // Assign createdBy with the loggedInUser employee Id from store
        this.editedTask.createdBy = this.$store.state.auth.employeeId;  
        this.editedTask.project = Number(this.id);

        //Set End Date
        this.setEndDate();
    
        //Function call to create new task
        TaskDataService.createTask(this.editedTask)
        .then((response) => {
            this.retrieveProjectDetails();
        })
                      
        alert(`Created a Task !!!`);
        this.close();
    }

}
</script>