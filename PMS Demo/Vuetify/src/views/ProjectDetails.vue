<template >
    <v-container fluid >
        <v-row>
            <v-breadcrumbs :items="[{
                                        text: project.name,
                                        disabled: false,
                                        
                                    },
                                    {
                                        text: 'View',
                                        disabled: false,
                                    }]">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-progress-linear
                        background-color="blue lighten-5"
                        color="blue lighten-1"
                        rounded
                        :value="getProgress()"
                    ></v-progress-linear>
                    <v-row class=" mb-3">
                        <v-col cols="12" sm="3" v-for="(phase, index) in phases" :key="index" >
                            <v-card class="text-center" flat>
                                <v-card-title class="cyan--text text--darken-4 justify-center"> {{ phase.text }}
                                </v-card-title>
                                <v-card-subtitle v-if="getPhaseProgress(phase.value) == 100">
                                    <v-icon color="green" size="50">
                                        mdi-check-circle
                                    </v-icon>
                                    <div >
                                        Completed
                                    </div>
                                </v-card-subtitle>
                                <v-card-subtitle v-else-if="getPhaseProgress(phase.value) > 0">
                                    <v-progress-circular
                                    :rotate="90"
                                    :size="50"
                                    :width="8"
                                    :value="getPhaseProgress(phase.value)"
                                    color="blue"
                                    >
                                    <span class="black--text">{{ getPhaseProgress(phase.value) }}%</span>
                                    </v-progress-circular>
                                    <div >
                                        In Progress
                                    </div>
                                        
                                </v-card-subtitle >  
                                <v-card-subtitle v-else>
                                    <v-icon color="orange" size="50">
                                        mdi-av-timer
                                    </v-icon>
                                    <div >
                                        Waiting
                                    </div>
                                </v-card-subtitle>
                            </v-card>
                        </v-col>       
                    </v-row>               
    
                </v-card>
            </v-col>
        </v-row>
        <v-row class=" mb-3">
            <v-col cols="12" sm="6" >
                <v-card>
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
            </v-col>
            <v-col cols="12" sm="6" >
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
                            <!-- <tr> -->
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
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" >
                <v-card >
                <!-- <v-card-title class="purple lighten-5 purple--text">Workload</v-card-title> -->
                <v-card-title class="cyan--text text--darken-4 grey lighten-3">Workload</v-card-title>
                <v-card-text>

                    <BarChart 
                    :data=workloadData
                    :labels=workloadLabels
                    legend = "Workload(Percentage)"
                    color="teal"
                    :height="150"
                    />
                </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" >
                <v-card >
                    <!-- <v-card-title class="deep-orange lighten-5 deep-orange--text">Tasks</v-card-title> -->
                    <v-card-title class="cyan--text text--darken-4 grey lighten-3">Tasks</v-card-title>
                    <v-card-text>
                        <BarChart 
                        :data=tasksData
                        :labels=statusLabels
                        legend= "Tasks(Percentage)"
                        color="teal"
                        :height="150"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-row class=" mb-3">
            <v-col cols="12" sm="3" >
                <v-card>
                    <v-card-title class="amber--text justify-center">
                        New
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3" >
                <v-card>
                    <v-card-title class="cyan--text justify-center">
                        In Progress
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3" >
                <v-card >
                    <v-card-title class="purple--text justify-center">
                        Resolved
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3" >
                <v-card>
                    <v-card-title class="green--text justify-center">
                        Closed
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row> -->
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from "moment";
import BarChart from '@/components/BarChart.vue';
import ProjectDataService from "../services/ProjectDataService";

@Component({
    components: {
      BarChart
    }
})
export default class ProjectDetails extends Vue { 
    
    private id: any='';
    private progress: any= 0;
    private project: any ={};
    private upcomingTasks: any = [];
    private overdueTasks: any = [];
    private workloadData: any =[];
    private workloadLabels: any =[];
    private tasksData: any =[];
    private tasks: any = [];
    private employees: any = [];
    private status: any = [
        { text: 'New', value: 'new', color:'deep-orange' },
        { text: 'In Progress', value: 'inProgress', color:'cyan' },
        { text: 'Resolved', value: 'resolved', color:'purple' },
        { text: 'Closed', value: 'closed', color:'green' }
    ];
    private phases: any = [
        { text: 'Planning', value: 'planning', color:'orange' },
        { text: 'Design', value: 'design', color:'pink' },
        { text: 'Development', value: 'development', color:'blue' },
        { text: 'Testing', value: 'testing', color:'grey' }
    ];
    private color: any = '';

    // Load Project Details when the component is mounted
    mounted() {
        this.retrieveProjectDetails()
    }

    // Get Project Details 
    retrieveProjectDetails(){
        this.id = this.$route.params.id;
        ProjectDataService.getProjectDetails(this.id.toString())
        .then((response) => { 
            this.project = response.data;
            this.tasks = response.data.tasks;
            for( let i=0; i<response.data.worksOn.length; i++) {                
                this.employees.push(response.data.worksOn[i].employee)
            }
            this.getUpcomingTasks();
            this.getOverdueTasks();
            this.getWorkLoad();
            this.getTasksDitribution();
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // Get the date in 'Jan 10, 2021' format
    formatDate(date: any) {
        return moment(date).format('ll');
    }

    // Get the Overdue Tasks
    getOverdueTasks(){
        for( const i of this.tasks ) {
            if(((Math.floor((new Date().getTime() - new Date(i.endDate).getTime()) / (1000 * 3600 * 24)))>0) 
                && (i.status != 'closed')) {
                this.overdueTasks.push(i);
            }
        }
    }

    // Get the Upcoming Tasks
    getUpcomingTasks(){
        for( const i of this.tasks ) {
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

    // Get the Total number of tasks
    getTotalTasks() {
        const total: any = this.project.tasks.length;  
        return String(total).padStart(2, '0');
    }

    // Get the Closed Tasks Details
    closedTasks() {
        let count = 0;
        /* for(const i of this.tasks) { */
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
        return count/totalTasks *100;
    }
    // Get the Work load of all the employees in a Project
    getWorkLoad() {
        const totalTasks = Number(this.getTotalTasks());
         for(const i of this.employees) {
       /*  for(const i of this.project.employees) { */
            let employeeTasks = 0;
            this.workloadLabels.push(i.name);
            for( const j of this.project.tasks) {
                if( j.assignee.id == i.id) {
                    employeeTasks +=1;

                }
            }
            this.workloadData.push((employeeTasks/totalTasks*100));
        }
    }
    // Get the different status labels for the tasks(New, Inprogress, Resolved and Closed)
    get statusLabels(){
        const labels =[];
        for( const i of this.status) {
            labels.push(i.text);
        }
        return labels;
    }
    // Get the Task Distribution for the employees in a project
    getTasksDitribution() {
        const totalTasks = Number(this.getTotalTasks());
        
        for(const i of this.status) {
            let statusCount = 0;
            for( const j of this.tasks) {
                if( j.status == i.value) {
                    statusCount +=1;

                }
            }
            this.tasksData.push((statusCount/totalTasks*100));
        }
    }
}
</script>