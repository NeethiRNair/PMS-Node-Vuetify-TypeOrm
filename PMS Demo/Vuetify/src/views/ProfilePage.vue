<template color="cyan">
  <v-container class="my-auto" fluid> 
    <v-dialog
        max-width="500"
        v-model="dialog"
        persistent                    
        >
            <v-card >
                <v-card-title>
                    <span class="headline">Edit Profile</span>
                    <v-spacer></v-spacer>
                    <v-btn color="cyan darken-2" 
                    dark 
                    class="text-capitalize"
                    @click="changePassword(loggedInUser.authDetails)"
                    >
                    change password
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>   
                            <v-col cols="6" sm="6">
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
                            <v-col cols="6" sm="6">
                                <v-img class="mx-auto my-n9"  
                                :src="imageUrl" 
                                height="80" width="80" > </v-img>
                            </v-col>
                                                 
                                                   
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Name"
                                    required
                                    single-line
                                    v-model="editedEmployee.name"
                                    ></v-text-field>
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
        
    <template >
      <v-row>

        <v-breadcrumbs :items="[{
                                      text: 'Profile',
                                      disabled: false,
                                  }]">
              <template v-slot:divider>
                  <v-icon>mdi-chevron-right</v-icon>
              </template>
          </v-breadcrumbs>
          <v-spacer></v-spacer>
          <v-btn  text @click="updateProfile(employee)" fab class="sm-4"
                      color="cyan">
                  <v-icon class="edit-icon" >mdi-account-edit-outline</v-icon>
          </v-btn>
      </v-row>
      <v-row no-gutters class="p-1 elevation-1" >
        <v-col
            cols="12"
            md="4" 
            sm="12"           
        >
            <v-card  min-width="300" height="100%">

              <v-flex v-if="loggedInUser.image" class="mx-auto pt-5 text-center">
                <v-avatar size="140" >                            
                  <v-img 
                    :src="getImage(loggedInUser.image)"
                    aspect-ratio="1">
                      
                </v-img>
                </v-avatar>
              </v-flex>
              <v-flex v-else  class="mx-auto pt-5 text-center">
                 <v-avatar size="140">                            
                    <v-img src="../assets/image.png"
                    ></v-img >
                </v-avatar>
              </v-flex>
              <v-card-text class="text-center">
                <v-list dense class="" >
                  <v-list-item-content>
                    
                    <v-list-item-title class="font-weight-bold grey--text text--darken-1">{{ loggedInUser.empId }} </v-list-item-title>
                    <v-card-title class="font-weight-bold justify-center">{{ loggedInUser.name }} </v-card-title >
                  </v-list-item-content>
                  <v-divider ></v-divider>
                  <v-list-item-content>
                    <v-card-subtitle  class="text-capitalize">
                        <strong>
                        {{loggedInUser.jobTitle}}
                        </strong>
                    </v-card-subtitle>
                  </v-list-item-content>
                  <v-divider ></v-divider>
                  <v-list-item-content>
                    <v-card-subtitle class="text-subtitle-1">{{ department.name }} Department</v-card-subtitle>
                  </v-list-item-content>
                  
                </v-list>
              
               
                </v-card-text>
            </v-card>
        </v-col>
 
        <v-col
            cols="12"
            md="8"
        >
        <v-card  min-width="300" height="100%">
           <v-tabs v-model="tab" icons-and-text ce>
             <v-tabs-slider></v-tabs-slider>
      
            <v-tab href="#tab-1">Personal</v-tab>
            <v-tab href="#tab-2">Projects</v-tab>
            
          </v-tabs>

          <v-tabs-items v-model="tab">
          <v-tab-item
          value="tab-1"
          >
            <v-card flat class="mx-5">
              <v-card-text>
                <v-simple-table>
                  <tbody>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">Employee Id</td>
                      <td width="1%" >:</td>
                      <td>{{ loggedInUser.empId }}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">Address</td>
                      <td width="1%" >:</td>
                      <td>{{ loggedInUser.address }}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">Phone Number</td>
                      <td width="1%" >:</td>
                      <td>{{ loggedInUser.phoneNumber }}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">Email</td>
                      <td width="1%" >:</td>
                      <td>{{ loggedInUser.email }}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">Date of Join</td>
                      <td width="1%" >:</td>
                      <td>{{ getDate(loggedInUser.dateOfJoin) }}</td>
                    </tr>
                    <tr>
                      <td width="25%" class="grey--text text--darken-2">User Name</td>
                      <td width="1%" >:</td>
                      <td>{{ loggedInUser.authDetails.userName }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

         <v-tabs-items v-model="tab">
          <v-tab-item
          value="tab-2"
          >
            <v-card flat class="mx-5">
              <v-card-text>
                  <v-list v-if="worksOn.length != 0"  dense  two-line>    
                      <div v-for="(item, index) in worksOn" :key="item">
                        
                          <v-list-item-content>
                              <v-list-item-title class="grey--text text--darken-2 font-weight-bold pointer"
                               @click="navigateToProject(item.project.code)">
                                {{ item.project.name }} 
                              </v-list-item-title>    
                          </v-list-item-content>
                          <v-simple-table>
                              <tbody>
                                <tr>
                                  <td width="15%" class="grey--text text--darken-2">Client</td>
                                  <td width="1%" >:</td>
                                  <td>{{ item.project.client }}</td>
                                </tr>
                                <tr>
                                  <td width="15%" class="grey--text text--darken-2">Hours</td>
                                  <td width="1%" >:</td>
                                  <td>{{ item.hours }}</td>
                                </tr>
                                <tr>
                                  <td width="15%" class="grey--text text--darken-2">Start Date</td>
                                  <td width="1%" >:</td>
                                  <td>{{ formatDate(item.project.startDate) }}</td>
                                </tr>
                                <tr>
                                  <td width="15%" class="grey--text text--darken-2">End Date</td>
                                  <td width="1%" >:</td>
                                  <td>{{ formatDate(item.project.endDate) }}</td>
                                </tr>
                              </tbody>
                          </v-simple-table>
                          <v-divider class="divider"
                            v-if="index < worksOn.length "
                            :key="index">
                          </v-divider>
                          
                      </div>   
                  </v-list>
                  <v-list v-else class="mx-5"> No Projects
                  </v-list>

              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        </v-card>
        </v-col>
       
      </v-row>
    </template>  
   
    
  </v-container > 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import EmployeeDataService from "../services/EmployeeDataService";

@Component({
  components: { },
})
export default class ProfilePage extends Vue {
  private loggedInUser: any = {};
  private currentUser: any ;
  private worksOn: any;
  private department: any;
  private employee: any;
  private editedEmployee: any = {}; 
  private file!: File ; // Definite Assignment Assertion (!)
  private imageUrl: string|ArrayBuffer|null= null;
  private dialog = false;
  private editedIndex = -1;
  private dialogAuth= false;
  private password: string;
  private newPassword: string;
  private confirmPassword: string;
  private tab: any = null;

  // Set the date to 'Jan 10, 2021' format(Setter)
  formatDate(date: any) {
        return moment(date).format('ll');
  }

  // Get the date in 'Jan 10, 2021' format
  getDate() {
    return moment(this.loggedInUser.dateOfJoin).format('LL');
  }

  // get the logged in employee's username
  get loggedInUserName(){ 
      return this.$store.state.auth.userName;
  }

  // Get Employee Profile
  retrieveProfile() {
        EmployeeDataService.getEmployeeProfile(this.loggedInUserName)
        .then((response) => {
            this.loggedInUser = response;
            this.worksOn = this.loggedInUser.worksOn;
            this.department = this.loggedInUser.department;
            EmployeeDataService.getEmployee(this.loggedInUser.id.toString())
          .then((response) => {
            this.employee = response.data;  
          })     
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
    }

    // Navigate to projectb details page if hte employee is manager or admin
    navigateToProject(projectCode: number) {
      if ( (this.$store.state.auth.userType).toLowerCase() != 'normal' ) {

        this.$router.push(`/projects/${projectCode}`);
      }


    }
    
    // Get the profile photo for Employee
    getImage(empImage: any){
        return `http://localhost:3000/employees/employeeImage/${empImage}`;
      
    }

    // Open the dialog box for changing password
    changePassword (auth: any){
      this.dialogAuth = true;
    }

    // Assign the selected employee details to editedEmployee form 
    updateProfile (emp: any) {

        this.editedIndex = emp.id;
        this.editedEmployee = Object.assign({}, emp)
        this.dialog = true
    }

    // Close the Dialog
    close () {
        this.dialog = false
        
      }
  
  // Load Employee profile when the component is mounted
  mounted(){
    if (! this.$store.state.auth.token && !localStorage.getItem('token')) {
      this.$router.push('/');
    }
    else{
      this.retrieveProfile();
  
    }
  } 

  // Saving the new Employee or update Employee
  saveEmployee () {
    const formData = new FormData();
    if( this.file) {
      formData.append('image', this.file, this.file.name);
    }
      formData.append('employee', JSON.stringify(this.editedEmployee))
   
      EmployeeDataService.uploadFileData(formData, this.editedIndex.toString())
      .then(() => {
        const userInfo: any = {
          name: this.editedEmployee.name,
          
        }
        if( this.file) {
          userInfo['image'] = this.file.name;
        } 
        else { 
          userInfo['image'] = this.editedEmployee.image       
        }
        this.$store.dispatch('auth/updateUser', userInfo);        
        //this.$emit('updatedUserInfo', userInfo);  
        this.retrieveProfile();
      })           
        alert(`Updated Employee : ${this.editedEmployee.name}!!!`);      
    this.close()
  }

  // Resetting the password 
  savePassword(){
    /* console.log("save password"); */
    /* if(this.password == this.loggedInUser.authDetails.password) {
      if(this.newPassword == this.confirmPassword) {
        console.log(this.newPassword)
  
      }

    } */
    this.dialogAuth = false;
  }
}
</script>

<style  scoped>
.edit-icon{
  cursor: pointer;
}

.pointer:hover {
  cursor: pointer;
}
.divider {
  
  background: rgb(81, 117, 117);
}
</style>