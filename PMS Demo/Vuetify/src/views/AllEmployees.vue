<template>
    
  <v-container fluid >  
    <v-breadcrumbs :items="[
                          {
                            text: 'Employees',
                            disabled: false,
                          }
                          ]">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

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
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Name"
                                    required
                                    single-line
                                    v-model="editedEmployee.name"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" >
                                    <v-select
                                      :items="departments"
                                      v-model="editedEmployee.department"
                                      label="Department"
                                      item-text="name"
                                      item-value="id"
                                      single-line
                                    ></v-select>         
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      :items="jobTitles"
                                      v-model="editedEmployee.jobTitle"
                                      label="Designation"
                                      item-text="text"
                                      item-value="title"
                                      single-line
                                    ></v-select>         
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Address"
                                    required
                                    v-model="editedEmployee.address"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Phone Number"
                                    required
                                    v-model="editedEmployee.phoneNumber"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    label="Email"
                                    required type="email"
                                    v-model="editedEmployee.email"
                                    ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" v-if="editedIndex == -1">
                                <v-text-field
                                    label="User Name"
                                    required
                                    v-model="editedEmployee.authDetails.userName"
                                    ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="6">
                              <v-menu
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="getFormattedDate"
                                    label="Date of Join"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="editedEmployee.dateOfJoin"
                                  @input="menu = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>


                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Salary"
                                    required
                                    v-model="editedEmployee.salary"
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
                        @click="saveEmployee"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline" v-bind="editedEmployee.name">Are you sure you want to delete '{{editedEmployee.name}}' ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <v-card class=" elevation-5 ">
        <v-card-title>
          <v-row>
            <v-select
              :items="departments"
              v-model="search"
              label="Department"
              item-text="name"
              item-value="name"
              single-line
              ></v-select> 

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>  
          </v-row>
      </v-card-title>
    
      <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
       
        :items-per-page.sync="employeesPerPage"
        :footer-props="{
          'items-per-page-options': employeesPerPageArray
        }" 
        
        
      >

        <template v-slot:item.dateOfJoin="{ item }">
          <span>{{ getDate(item.dateOfJoin) }}</span>
        </template>
        <template v-slot:item.jobTitle="{ item }">
          <span class="text-capitalize" >{{ item.jobTitle }}</span>
        </template>
        <template v-slot:item.userType="{ item }">
          <span class="text-capitalize" >{{ item.userType }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            
            class="mr-2"
            small
            @click="editEmployee(item)"
            color="warning"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            class="mr-2"
            small
            @click="deleteEmployee(item)"
            color="error"
          >
            mdi-delete
          </v-icon>

          <v-dialog
            max-width="500"
            v-model="employeeDialog"
                        
            >

            <template v-slot:activator="{ on, attrs }">
              <v-icon
              small
                class="mr-2"
                @click="getEmployee(item)"
                color="info"
                v-bind="attrs"
                v-on="on"
              >
                mdi-information
              </v-icon>
            </template>

            <v-card flat >
              
                <v-card-title class="sm-8 cyan darken-2 white--text">
                    <v-avatar class="mx-5" v-if="currentEmployee.image">
                      <img :src="getImage(currentEmployee.image)"  >
                    </v-avatar>
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
                        <v-list-item-content>Department:</v-list-item-content>
                        <v-list-item-content class="align-end text-capitalize">
                        {{ currentEmployee.department.name }}
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
                        <v-list-item-content>User Name:</v-list-item-content>
                        <v-list-item-content class="align-end">
                        {{ currentEmployee.authDetails.userName }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Date of Join:</v-list-item-content>
                        <v-list-item-content class="align-end">
                        {{ getDate(currentEmployee.dateOfJoin) }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>Type of User:</v-list-item-content>
                        <v-list-item-content class="align-end text-capitalize">
                        {{ currentEmployee.userType }}
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content><span>Salary <small>(INR)</small>:</span></v-list-item-content>
                        <v-list-item-content class="align-end ">
                        {{ currentEmployee.salary }}
                        </v-list-item-content>
                    </v-list-item>
                    
                </v-list>
            </v-card>
          </v-dialog>
        </template>  
      </v-data-table>
    </v-card> 



  </v-container>
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue, Watch } from "vue-property-decorator";
import DepartmentDataService from "../services/DepartmentDataService";
import EmployeeDataService from "../services/EmployeeDataService";

@Component
export default class AllEmployees extends Vue {
    private employees: any[] = [];
    private departments: any =[];
    private currentEmployee= {
      authDetails : {
        userName : "",
        password : ""
      },
      department : {
        name : "",
        location: ""
      },
      worksOn : [],
      image: ''
    };
    private id = '';
    private search = '';
    private employeesPerPageArray=[5, 10, 15, -1];
    private employeesPerPage = 2;
    private page = 1;
    private menu= false;
    private select= { text: 'SSE', title: 'software engineer' };
    private jobTitles= [
          { text: 'Director', title: 'director' },
          { text: 'PM', title: 'project manager' },
          { text: 'SSE', title: 'software engineer' }
        ]
    private editedEmployee = {
      name: '',
      address: '',
      phoneNumber:'',
      email: '',
      jobTitle: '',
      dateOfJoin: new Date().toISOString().substr(0, 10),
      salary: '',
      userType: 'normal',
      authDetails : {
        userName : "",
        password : ""
      },
      department : {},
      image: ''
    };
    private defaultItem = {
      name: '',
      address: '',
      phoneNumber:'',
      email: '',
      jobTitle: '',
      dateOfJoin: new Date().toISOString().substr(0, 10),
      salary: '',
      userType: 'normal',
      authDetails : {
        userName : "",
        password : ""
      },
      department : {},
      image: ''
    };
    private pagination= {
        rowsPerPage: 20
    }
    private file!: File ; // Definite Assignment Assertion (!)
    private image!: File;
    private imageUrl: string|ArrayBuffer|null= null;
    private dialog = false;
    private  dialogDelete= false;
    private employeeDialog = false;
    private  editedIndex = -1;
    private headers= [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Department', value: 'department.name' },
        { text: 'Designation', value: 'jobTitle' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phoneNumber' },  
        { text: 'Date of Join', value: 'dateOfJoin' },
        { text: 'User Type', value: 'userType' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
      
      // Watcher for closing Edit/New Employee Dialog
      @Watch('dialog')
      dialogChange (val: any) {
          val || this.close()
      }

      // Watcher for closing Delete Dialog
      @Watch('dialogDelete')
      dialogDeleteChange (val: any) {
          val || this.closeDelete()
      }

      //Set the Form title to New or edit
      get formTitle () {
          return this.editedIndex === -1 ? 'New Employee' : 'Edit Employee'
      }

    // Get all Employees
    retrieveAllEmployees(){
      EmployeeDataService.getAllEmployees()
        .then((response: any) => {   
            this.employees = response; 
        })
        .catch((e: any) => {
            console.log(e);
        }); 
    }

    // Get all Departments
    getAllDepartments() {
      DepartmentDataService.getAllDepartmentsOnly()
        .then((response) => {
            this.departments = response.data;    
        })
        .catch((e) => {
            console.log(e);
        }); 
    }

    // Get Employee Profile
    getEmployee(item: any){
      EmployeeDataService.getEmployeeProfile(item.authDetails.userName)
        .then((response) => {   
            this.currentEmployee = response;
        })        
        .catch((e) => {
            console.log(e);
        }); 
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

    // Get the profile ohoto for Employee
    getImage(empImage: any){
          return `http://localhost:3000/employees/employeeImage/${empImage}`
    }

    // Set the date to 'Jan 10, 2021' format
    get getFormattedDate() {
        return moment(this.editedEmployee.dateOfJoin).format('ll');
    }
    // Get the date in 'Jan 10, 2021' format
    getDate(date: string) {
        return moment(date).format('ll');
    }

    // Load All Departments and All Employees when the component is mounted
    mounted(){
      if (!this.$store.state.auth.token) {
            this.$router.push('/');
        }
      this.getAllDepartments();
      this.retrieveAllEmployees()


    }
    // Setting No.of pages for the vuetify data table
    get numberOfPages () {
        return Math.ceil(this.employees.length / this.employeesPerPage)
    }
    // Function for getting next page in data table
    nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
    }
    // Function for getting previous page in data table
    formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
    }
    // Updates employees per page to be displayed
    updateEmployeesPerPage (number: number) {
        this.employeesPerPage = number
    }

    // Assign the selected employee details to editedEmployee form 
    editEmployee (item: any) {
        this.editedIndex = item.id;
        // Converting the dates to ISO string
        item.dateOfJoin = moment(item.dateOfJoin).toISOString().substr(0, 10);
        this.editedEmployee = Object.assign({}, item)
        this.dialog = true
    }

    // Function to display the delete dialog box
    deleteEmployee (item: any) {
        this.editedIndex = item.id;
        this.editedEmployee = Object.assign({}, item)
        this.dialogDelete = true
      }
      
      // Confirm Delete where the Employee is actually deleted
      deleteItemConfirm () {
        EmployeeDataService.deleteEmployee(this.editedIndex.toString())
           .then((response) => {
               this.retrieveAllEmployees();
               alert(`Deleted Employee!!!`);
            })
        this.closeDelete()
      }
      
    // Close the Dialog and reset the form
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedEmployee = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }

    // Close the Delete Dialog
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedEmployee = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }

      // Set date format to JavaScript date format before inserting to database
      setDate(){
            this.editedEmployee.dateOfJoin = moment(this.editedEmployee.dateOfJoin).toString();
        }

      // Saving the new Employee or update Employee
      saveEmployee () {
        this.setDate();
        if (this.editedIndex > -1) {
            let currentDepartment;           
            if(! this.file) { 
              EmployeeDataService.updateEmployee(this.editedIndex.toString(), this.editedEmployee)
              .then((response: any) => {
                this.retrieveAllEmployees();
              })  
              alert(`Updated Employee : ${this.editedEmployee.name}!!!`);
            }    
          
        } else {
          
          // Setting default password as username
          this.editedEmployee.authDetails.password = this.editedEmployee.authDetails.userName;
          
          this.editedEmployee.image = '';   
            EmployeeDataService.createEmployee(this.editedEmployee)
           .then((response) => {
                this.retrieveAllEmployees();
            })
                      
            alert(`Created Employee : ${this.editedEmployee.name}!!!`); 
        }
        this.close()
      }

}
</script>