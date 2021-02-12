<template>
    <v-container fluid>
        <v-breadcrumbs :items="[{
                                text: project.name,
                                disabled: false,
                                },
                                {
                                text: 'Members',
                                disabled: false,
                                },]">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
        </v-breadcrumbs>
        <v-row class="mx-auto mb-3">
            <v-col cols="12" sm="3" md="2" v-for="(employee, index) in employees" :key="index">
                <v-card class="mx-1 elevation-5 my-2 tile text-center" height="100%" width="100%"> 
                    <v-flex v-if="employee.image" class="mx-auto pt-5 text-center">
                        <v-avatar size="90" >                            
                            <v-img :src="getImage(employee.image)" aspect-ratio="1"
                            ></v-img >
                        </v-avatar>
                    </v-flex>
                    <v-flex v-else  class="mx-auto pt-5 text-center">
                        <v-avatar size="90" >                            
                            <v-img src="../assets/image.png"
                            ></v-img >
                        </v-avatar>

                    </v-flex>
                    <v-card-subtitle class="justify-center text-capitalize">
                        <div >
                            <strong>{{ employee.name }}</strong>
                        </div>
                        <div>
                            {{ employee.jobTitle }}
                        </div>
                    </v-card-subtitle>
                </v-card>    
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectDataService from '../services/ProjectDataService';

@Component({})
export default class ProjectEmployees extends Vue {
    private id: any ='';
    private project: any= {};
    private tasks: any = [];
    private employees: any = [];
    
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
    // Load Project Details when the component is mounted
    mounted() {
        this.retrieveProjectDetails();
    }
     // Get the profile photo for Employee
    getImage(empImage: any){
        return `http://localhost:3000/employees/employeeImage/${empImage}`;
      
    }
}
</script>
