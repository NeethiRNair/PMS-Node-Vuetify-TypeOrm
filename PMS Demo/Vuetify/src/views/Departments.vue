<template>
    <v-container fluid>  
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
                            
                            <v-col cols="6">
                                <!-- <input type="file"  v-on:change="onFileChange" /> -->
                                <v-file-input
                                    label="Image"
                                    dense
                                    v-model="file"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera" 
                                    v-on:change="onFileChange"
                                    ref="myFileInput"
                                ></v-file-input>
                                
                            </v-col>                        
                            <v-col cols="6" v-if="imageUrl">
                                <v-img class="mx-auto text-center"  
                                :src="imageUrl" alt="department.name" 
                                height="90" width="90" > </v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Department"
                                    
                                    v-model="editedDepartment.name"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Location"
                                    
                                    v-model="editedDepartment.location"
                                    ></v-text-field>
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
                        @click="saveDepartment()"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card class="justify-cneter">
              <v-card-title class="headline text-center" v-bind="editedDepartment.name">Are you sure you want to delete '{{editedDepartment.name}}' ? </v-card-title>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-col class="mb-2"  cols="6" md="4">
            <!-- <h4 class=" ">DEPARTMENTS</h4> -->
            <v-breadcrumbs :items="[{
                                    text: 'Departments',
                                    disabled: false,
                                    },]">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
            </v-breadcrumbs>
        </v-col>
        
        <v-row class="mx-auto mb-3">
            <v-col cols="12" sm="4" xs="6" v-for="(department, index) in departments" :key="index" >
                    <v-card elevation="4" class="mx-1  my-2 tile" height="100%" width="100%">
                        <v-img class="mx-auto pt-5 text-center"  :src="getImage(department.image)" alt="department.name" 
                        aspect-ratio="2.5" >
                        <!-- <v-img class="mx-auto pt-5 text-center" src="../assets/deptImage.jpeg"> -->
                            <!-- <v-icon color="blue darken-2" size="70">
                                mdi-chart-bar-stacked
                            </v-icon> -->
                        </v-img> 
                        <v-card-title class="justify-center">{{ department.name }}
                        </v-card-title> 
                        
                        <v-card-actions class="justify-end mb-n5">

                                <v-btn-toggle
                                    color="blue"
                                    >

                                        <template  >
                                        <v-icon
                                            color="warning"
                                            class="mx-1"
                                            @click="editDepartment(department)"
                                            
                                        >
                                            mdi-pencil-outline
                                        </v-icon>
                                        </template>

                                        <v-icon
                                        color="error"
                                        class="mx-1"
                                        @click="currentDepartmentDelete(department)"
                                        >
                                            mdi-delete-outline
                                        </v-icon>
                                        <v-icon
                                        color="info"
                                        class="mx-1"
                                        @click="navigateToDepartment(department)"
                                        >
                                            mdi-information-outline
                                        </v-icon>

                                </v-btn-toggle>
                            
                        </v-card-actions>
                    </v-card>
            </v-col>
        </v-row>

        
    </v-container>  
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import DepartmentDataService from "../services/DepartmentDataService";

@Component
export default class Departments extends Vue {
    private departments: any[] = [];
    private dialog = false;
    private  dialogDelete= false;
    private  editedIndex = -1;
    private  editedDepartment = {
        name: '',
        location: '',
        image: ''
    };
    private imageUrl: string|ArrayBuffer|null= null;
    private defaultDepartment = {      
        name: '',
        location: '',
        image: ''
    };
    private file!: File ; // Definite Assignment Assertion (!)
    private image!: File;

    // Watcher for closing Edit/New Depaartment Dialog
    @Watch('dialog')
    dialogChange (val: any) {
        val || this.close()
    }

    // Watcher for closing Delete Dialog
    @Watch('dialogDelete')
    dialogDeleteChange (val: any) {
        val || this.closeDelete()
      }

    // Get the image for Department
    getImage(deptImage: any){
        return `http://localhost:3000/departments/departmentImage/${deptImage}`
    }

    //Set the Form title to New or edit
    get formTitle () {
        return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
    }

    // Get all Departments
    retrieveDepartments() {
        DepartmentDataService.getAll()
        .then((response) => {
            this.departments = response.data;
            
        })
        .catch((e) => {
            console.log(e);
        }); 
    
    }

    // Navigate to Employees List in a Department
    navigateToDepartment(department: any) {
        this.$router.push(`/departments/${department.id}/employees`);
    }

    // Event Listener for Filechange Event
    onFileChange(event: any) {
        if(! this.file){
            this.imageUrl = ''
        }
        const filename = this.file.name ;
        if (filename.lastIndexOf('.') <=0 ) {
            return alert("Please add avalid file");
        } 
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result;
        })
        fileReader.readAsDataURL(this.file)
        this.image = this.file;  
    }

    // Load All Departments when the component is mounted
    mounted(){
        if (! this.$store.state.auth.token && !localStorage.getItem('token') ) {
            this.$router.push('/');
        }
        this.retrieveDepartments();
    }
    
    // Close the Dialog and reset the form
    close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedDepartment = Object.assign({}, this.defaultDepartment)
          this.editedIndex = -1
        })
    }

    // Close the Delete Dialog
    closeDelete () {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedDepartment = Object.assign({}, this.defaultDepartment)
          this.editedIndex = -1
        })
    }

    // Assign the selected department details to editedDepartment form 
    editDepartment (dept: any) {
        this.editedIndex = dept.id
        delete dept.employees;
        this.editedDepartment = Object.assign({}, dept)
        this.dialog = true
    }
   
    // Assign the selected department details to editedDepartment form for Deleting
    currentDepartmentDelete(dept: any){
        this.editedIndex =  dept.id
        this.editedDepartment = Object.assign({}, dept)
        this.dialogDelete = true
    }

    // Saving the new Department or update Department
    saveDepartment(){
        const formData = new FormData();
        if(this.file) {
            formData.append('image', this.file, this.file.name)
        }
            formData.append('department', JSON.stringify(this.editedDepartment))
        
            DepartmentDataService.uploadFileData(formData, this.editedIndex.toString())
            .then(() => {
                this.retrieveDepartments();
            })
            .catch((err) => {
                    console.log(err)
            }) 
       
        this.close();
    }

    // Confirm Delete where the Department is actually deleted
    deleteItemConfirm () {
        DepartmentDataService.deleteDepartment(this.editedIndex.toString())
           .then((response) => {
               this.retrieveDepartments();
                alert(`Department Deleted!!!`);
            })
        this.closeDelete()
    }  
}
</script>


<style scoped>

</style>