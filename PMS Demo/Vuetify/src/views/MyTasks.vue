<template>
  <v-container fluid >  
        <v-row>
            <v-breadcrumbs :items="[{
                                        text: 'My Tasks',
                                        disabled: false,
                                        href: '',
                                    },
                                    ]">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-row>
        <v-row no-gutters class="elevation-1 cyan--text text--darken-4 grey lighten-3" >           
            </v-row>
            <v-row  >  
                <v-col cols="12" sm="6"  >
                    <v-card >
                        <v-card-subtitle class="cyan--text text--darken-4 grey lighten-3">
                            Assigned to Me
                        </v-card-subtitle>
                        <v-divider></v-divider> 
                        <div v-if="assignedToMeTasks != 0">
                            <v-card 
                            v-for="(task, index) in assignedToMeTasks" :key="index" 
                            flat>
                                
                                <v-expansion-panels accordion hover >
                                    <v-expansion-panel>
                                        <v-expansion-panel-header  >
                                            <span >{{ task.subject }}</span>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row class="mx-auto mb-1">
                                                <span>{{ task.description }}</span> 
                                                <v-icon dense color="blue" class="ml-auto" @click="navigateToTaskDetails(task.id)">mdi-information-outline</v-icon>
                                            </v-row>
                                            <v-chip class="cyan--text text--darken-4 text-capitalize" >
                                                {{ task.phase }}
                                            </v-chip> 
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>      
                            </v-card>
                        </div>
                        <div v-else>
                            <v-card>
                                <v-card-text>No tasks found</v-card-text>
                            </v-card>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6"  >
                    <v-card >
                        <v-card-subtitle class="cyan--text text--darken-4 grey lighten-3">
                            Created By Me
                        </v-card-subtitle>
                        <v-divider></v-divider> 
                        <div v-if="createdByMeTasks.length !=0 ">

                        
                            <v-card 
                            v-for="(task, index) in createdByMeTasks" :key="index" 
                            flat>
                                
                                <v-expansion-panels accordion hover >
                                    <v-expansion-panel>
                                        <v-expansion-panel-header  >
                                            <span >{{ task.subject }}</span>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row class="mx-auto mb-1">
                                                <span>{{ task.description }}</span> 
                                                <v-icon dense color="blue" class="ml-auto" @click="navigateToTaskDetails(task.id)">mdi-information-outline</v-icon>
                                            </v-row>
                                            <v-chip class="cyan--text text--darken-4 text-capitalize" >
                                                {{ task.phase }}
                                            </v-chip> 
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>      
                            </v-card>
                        </div>
                        <div v-else>
                            <v-card>
                                <v-card-text>No tasks found</v-card-text>
                            </v-card>
                        </div>
                    </v-card>
                </v-col>
               
            </v-row>
    <v-container>
        
                
    </v-container>

    </v-container>
</template>

<script lang="ts">
    import moment from "moment";
    import { Component, Vue, Watch } from "vue-property-decorator";
    import ProjectDataService from "../services/ProjectDataService";
    import TaskDataService from "../services/TaskDataService";

    @Component
    export default class MyTasks extends Vue {
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
        private assignedToMeTasks: any = [];
        private createdByMeTasks: any =[];
        // Get the date to 'Jan 10, 2021' format
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
        // Get the logged in employee id from store
        get loggedInEmployeeId(){ 
            return this.$store.state.auth.employeeId;
        }
        // Load Project Details when the component is mounted
        mounted() {
            if (! this.$store.state.auth.token && !localStorage.getItem('token')) {
            this.$router.push('/');
            }
            else {
                this.currentUserType;
                /* this.getProject(); */
                this.getMyTasks();
            }
        }
        // Get the logged in user type from store
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
        // Get all Tasks of the logged in Employee
        getMyTasks() {
            TaskDataService.assignedToMeTasks(this.loggedInEmployeeId.toString())
            .then(response => {
                this.assignedToMeTasks = response.data;
            })
            TaskDataService.createdByMeTasks(this.loggedInEmployeeId.toString())
            .then(response => {
                this.createdByMeTasks = response.data;
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
            console.log(code);
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
            /* TaskDataService.createTask(this.editedTask)
            .then((response) => {
                this.retrieveProjectDetails();
            }) */
                        
            alert(`Created a Task !!!`);
            this.close();
        }
        
    
    }
</script>