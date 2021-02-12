<template>
    <v-container fluid >  
        <v-dialog
        max-width="500"
        v-model="dialog"
        persistent                    
        >
            <v-card >
                <v-card-title>
                    <span class="headline">Edit Task</span>
                    
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
                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="getFormattedStartDate"
                                        label="Start Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="editedTask.startDate"
                                    no-title
                                    @input="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>
                              
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="getFormattedEndDate"
                                        label="End Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="editedTask.endDate"
                                    no-title
                                    @input="menu2 = false"
                                    ></v-date-picker>
                                </v-menu>
                              
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
        <v-row>
            <v-breadcrumbs :items="[{
                                        text: currentTask.project.name,
                                        disabled: false,
                                        to: '/projects'
                                    },
                                    {
                                        text: 'Tasks',
                                        disabled: false,
                                        to: `/projects/${currentTask.project.code}/tasks`
                                    },
                                    {
                                        text: currentTask.subject,
                                        disabled: false,
                                    }]">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <v-spacer></v-spacer>
            <v-btn  text @click="editTask(currentTask)" fab class="sm-4"
                        color="cyan">
                    <v-icon class="edit-icon" >mdi-account-edit-outline</v-icon>
            </v-btn>
        </v-row>
        <v-row no-gutters class="elevation-1 cyan--text text--darken-4 grey lighten-3" >
       
           
                <v-card-title class="cyan--text text--darken-4 grey lighten-3">
                    {{ 'Task#'+ String(currentTask.id).padStart(5, '0') }}
                </v-card-title>
            </v-row>
            <v-row no-gutters >
                <v-col
                    cols="12"
                    md="7"        
                       
                >
                <v-card min-width="300" height="100%" class="pa-5">

               
                    <v-card  flat >
                        <!-- <v-card-text> -->
                            <div class="subtitle-2 mb-3">Task Subject and Description</div>
                            <div class="ml-5">

                                <p class="title text--primary">
                                    {{ currentTask.subject }}
                                </p>
                                <p>{{ currentTask.description }} 
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id doloremque illo fugiat sapiente quis laudantium dicta eligendi? Atque rem ipsam corrupti, culpa praesentium eum quas minima velit, qui vel debitis.
                                </p>
                            </div>
                        <!-- </v-card-text> -->
                    </v-card>
                    <v-row>
                        <v-col cols="12" sm="1">
                        </v-col>
                        <v-col cols="12" sm="8">

                            <v-card flat>
                                <v-list  class=" mr-15">
                                    <v-list-item>
                                        <v-list-item-content class="grey--text text--darken-2 font-weight-bold">Priority</v-list-item-content>
                                        <v-list-item-content>:</v-list-item-content>
                                        <v-list-item-content class="align-start text-capitalize">
                                        {{ currentTask.priority }}
                                        </v-list-item-content>
                                    </v-list-item>
                        
                                    <v-list-item>
                                        <v-list-item-content class="grey--text text--darken-2 font-weight-bold">Status</v-list-item-content>
                                        <v-list-item-content>:</v-list-item-content>
                                        <v-list-item-content class="align-end text-capitalize">
                                            {{ currentTask.status }}
                          
                                        </v-list-item-content>
                                    </v-list-item>       
                                    <v-list-item>
                                        <v-list-item-content class="grey--text text--darken-2 font-weight-bold">Phase</v-list-item-content>
                                        <v-list-item-content>:</v-list-item-content>
                                        <v-list-item-content class="align-end text-capitalize"> 
                                             {{ currentTask.phase }}
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="grey--text text--darken-2 font-weight-bold">Start Date</v-list-item-content>
                                        <v-list-item-content>:</v-list-item-content>
                                        <v-list-item-content class="align-end">
                                        {{ formatDate(currentTask.startDate) }}
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content class="grey--text text--darken-2 font-weight-bold">End Date</v-list-item-content>
                                        <v-list-item-content>:</v-list-item-content>
                                        <v-list-item-content class="align-end">
                                        {{ formatDate(currentTask.endDate) }}
                                        </v-list-item-content>
                                    </v-list-item>    
                                </v-list>
                                
                                
                            </v-card>
                        </v-col>
                    </v-row>
                    </v-card>
                </v-col>
                <v-col
                    cols="12"
                    md="5"  
                >
                    <v-card  min-width="300" height="100%" class="pa-5">

                        <v-card-text class="mb-n5">Created By</v-card-text>
                        <div class="pt-5 px-5">
                            <v-sheet
                            class="mx-auto pa-1"
                            color="grey lighten-2"
                            rounded="true"
                            >
                                <v-card class="py-1">
                                    <v-list-item>
                                        <div v-if="currentTask.createdBy.image" >
                                            <v-list-item-avatar size="70" tile>                            
                                                <v-img :src="getImage(currentTask.createdBy.image)" aspect-ratio="1"
                                                ></v-img >
                                            </v-list-item-avatar>
                                        </div>
                                        <div v-else >
                                            <v-avatar size="70" tile>                            
                                                <v-img src="../assets/image.png"
                                                ></v-img >
                                            </v-avatar>
                                        </div>
                                        <v-list-item-content class="mx-2">
                                            <v-dialog
                                            max-width="500"
                                            v-model="employeeDialog"
                                                        
                                            >

                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-list-item-title v-bind="attrs"
                                                    v-on="on"
                                                    @click="getEmployee(currentTask.createdBy)">
                                                    {{ currentTask.createdBy.name }}
                                                    </v-list-item-title>
                                                
                                                </template>

                                                <v-card flat >
                                                
                                                    <v-card-title class="sm-8 cyan darken-3 white--text">
                                                        <div v-if="currentEmployee.image" >
                                                            <v-list-item-avatar size="70">                            
                                                                <v-img :src="getImage(currentEmployee.image)" aspect-ratio="1"
                                                                ></v-img >
                                                            </v-list-item-avatar>
                                                        </div>
                                                        <div v-else >
                                                            <v-list-item-avatar size="70">                            
                                                                <v-img src="../assets/image.png"
                                                                ></v-img >
                                                            </v-list-item-avatar>
                                                        </div>
                                                        <!-- <v-avatar class="mx-5" v-if="currentEmployee.image">
                                                            <img :src="getImage(currentEmployee.image)"  >
                                                        </v-avatar> -->
                                                        {{currentEmployee.name}} 
                                                        
                                                    </v-card-title>
                                                    <v-divider ></v-divider>
                                                    <v-list dense class="px-8">
                                                        <v-list-item>
                                                            <v-list-item-content>Designation:</v-list-item-content>
                                                            <v-list-item-content class="align-end text-capitalize">
                                                            {{ currentEmployee.jobTitle }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        
                                                        <v-list-item>
                                                            <v-list-item-content>Address:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.address }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>Email:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.email }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>Phone Number:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.phoneNumber }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        
                                                        <v-list-item>
                                                            <v-list-item-content>Date of Join:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ formatDate(currentEmployee.dateOfJoin) }}
                                                            </v-list-item-content>
                                                        </v-list-item>   
                                                    </v-list>
                                                </v-card>
                                        </v-dialog>
                                            
                                            <v-list-item-subtitle class="text-capitalize">{{ currentTask.createdBy.jobTitle }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                        
                                </v-card>

                            </v-sheet>
                        </div>

                        <v-card-text class="mb-n5 mt-3">Assignee</v-card-text>
                        <div class="pt-5 px-5">
                            <v-sheet
                            class="mx-auto pa-1"
                            color="grey lighten-2"
                            rounded="true"
                            >
                                <v-card class="py-1">
                                    <v-list-item>
                                        <div v-if="currentTask.assignee.image" >
                                            <v-list-item-avatar size="70" tile>                            
                                                <v-img :src="getImage(currentTask.assignee.image)" aspect-ratio="1"
                                                ></v-img >
                                            </v-list-item-avatar>
                                        </div>
                                        <div v-else >
                                            <v-list-item-avatar size="70" tile>                            
                                                <v-img src="../assets/image.png"
                                                ></v-img >
                                            </v-list-item-avatar>
                                        </div>
                                        <v-list-item-content class="mx-2">
                                            
                                            <v-dialog
                                            max-width="500"
                                            v-model="employeeDialog"
                                                        
                                            >

                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-list-item-title v-bind="attrs"
                                                    v-on="on"
                                                    @click="getEmployee(currentTask.assignee)">
                                                    {{ currentTask.assignee.name }}
                                                    </v-list-item-title>
                                                
                                                </template>

                                                <v-card flat >
                                                
                                                    <v-card-title class="sm-8 cyan darken-3 white--text">
                                                        <div v-if="currentEmployee.image" >
                                                            <v-list-item-avatar size="70">                            
                                                                <v-img :src="getImage(currentEmployee.image)" aspect-ratio="1"
                                                                ></v-img >
                                                            </v-list-item-avatar>
                                                        </div>
                                                        <div v-else >
                                                            <v-list-item-avatar size="70">                            
                                                                <v-img src="../assets/image.png"
                                                                ></v-img >
                                                            </v-list-item-avatar>
                                                        </div>
                                              
                                                        {{currentEmployee.name}} 
                                                        
                                                    </v-card-title>
                                                    <v-divider ></v-divider>
                                                    <v-list dense class="px-8">
                                                        <v-list-item>
                                                            <v-list-item-content>Designation:</v-list-item-content>
                                                            <v-list-item-content class="align-end text-capitalize">
                                                            {{ currentEmployee.jobTitle }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        
                                                        <v-list-item>
                                                            <v-list-item-content>Address:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.address }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>Email:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.email }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-content>Phone Number:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ currentEmployee.phoneNumber }}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                        
                                                        <v-list-item>
                                                            <v-list-item-content>Date of Join:</v-list-item-content>
                                                            <v-list-item-content class="align-end">
                                                            {{ formatDate(currentEmployee.dateOfJoin) }}
                                                            </v-list-item-content>
                                                        </v-list-item>   
                                                    </v-list>
                                                </v-card>
                                        </v-dialog>
                                            <v-list-item-subtitle class="text-capitalize">{{ currentTask.assignee.jobTitle }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                        
                                </v-card>

                            </v-sheet>
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
    import TaskDataService from "../services/TaskDataService";
    import EmployeeDataService from "../services/EmployeeDataService";

    @Component
    export default class TaskDetails extends Vue {
        private currentTask: any = {};
        private currentEmployee: any= {};
        private employee: any = {};
        private id: any = '';
        private dialog = false;
        private editedTask: any = {};  
        private defaultItem= {};
        private menu1= false;
        private menu2= false;
        private date: any =new Date().toISOString().substr(0, 10);
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
        private employeeDialog = false;
        // Get the Employee Details
        getEmployee(item: any){
            EmployeeDataService.getEmployee(item.id.toString())
            .then((response) => {
                this.currentEmployee = response.data;
            })
            
        }
        // Get the start date in 'Jan 10, 2021' format
        get getFormattedStartDate() {
            return moment(this.editedTask.startDate).format('ll');
        }
        // Get the end date in 'Jan 10, 2021' format
        get getFormattedEndDate() {
            return moment(this.editedTask.endDate).format('ll');
        }
        // Set date format to JavaScript date format before inserting to database
        setDate(){
            this.editedTask.startDate = moment(this.editedTask.startDate);
            this.editedTask.endDate = moment(this.editedTask.endDate);
        }
        // Get the Task details
        getTask(){
            this.id = this.$route.params.id;
            TaskDataService.getTask(this.id)
            .then((response) => {   
                this.currentTask = response.data;
                console.log(this.currentTask.project)
                this.currentTask.startDate = moment(this.currentTask.startDate).toISOString().substr(0, 10);
                this.currentTask.endDate = moment(this.currentTask.endDate).toISOString().substr(0, 10)
            })
            .catch((e) => {
                console.log(e);
            }); 
        }
        // Assign the selected task details to editedTask form 
        editTask (task: any) {        
            this.editedTask = Object.assign({}, task)
            this.dialog = true
        }
        // Load Task Details when the component is mounted
        mounted(){
            this.getTask()
        }
        // Get the date in 'Jan 10, 2021' format
        formatDate(date: any) {
            return moment(date).format('ll');
        }
        // Get the profile photo for Employee
        getImage(empImage: any){
            return `http://localhost:3000/employees/employeeImage/${empImage}`;
      
        }
        // Close the Dialog box anfd reset the form
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedTask = Object.assign({}, this.defaultItem)
            })
        }
        // Save the Updated Task
        saveTask() {
            //Set End Date
            this.setDate();
            console.log(this.editedTask.id, this.editedTask.status)
            //Function call to update task
            TaskDataService.updateTask(this.editedTask.id, this.editedTask)
            .then((response) => {
                this.getTask();
            })
                        
            alert(`Updated Task !!!`);
            this.close();
        }
    }
</script>