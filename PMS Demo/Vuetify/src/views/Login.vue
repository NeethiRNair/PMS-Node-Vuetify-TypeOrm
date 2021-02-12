<template>
    <v-container >    
        <v-layout align-center class="justify-center my-10" >  
            <v-card class="px-4 elevation-10 justify-center" min-width="350px" max-width="350px">
                <v-img class="mx-auto pt-4 mb-n5 text-center">
                    <v-icon color="grey lighten-2" size="100">
                        mdi-account-circle
                    </v-icon>
                </v-img>
                <v-card-title class="justify-center grey--text text--darken-2">
                   Sign in
                </v-card-title>
               
                <v-card-text class="mt-n4">
 
                    <v-form >
                         <v-row>
                            <v-text-field v-model="user.userName" label="User Name" required></v-text-field>
                        </v-row>
                        <v-row>
                           
                            <v-text-field v-model="user.password" type=password  label="Password" required></v-text-field>
                            
                        </v-row>
                        <v-row class="justify-center">
                                <v-btn  colored-border dark color="cyan darken-2" @click="login"> Login </v-btn>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>  
        </v-layout>
    </v-container>          


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService';
import User from '../models/user';

@Component({
    
  components: { },
})
export default class Login extends Vue {
    private user = new User('','');

    // Checks whether access_token is in store
    get isLoggedIn(){ 
      return this.$store.state.auth.token;
    }

    /* Checking user logged in status using Vuex Store: this.$store.state.auth.status.loggedIn. 
    If the status is true, we use Vue Router to direct user to Profile Page: */
    created() {
        if (this.isLoggedIn) {
            this.$router.push('/departments');
        }
    }

    /* In the login() function, we dispatch 'auth/login' Action to Vuex Store. 
    If the login is successful, go to Profile Page, otherwise, show error message. */
    login() {
        
        if( this.user.userName && this.user.password) {
            this.$store.dispatch('auth/login', this.user)
            .then(() => {    
                // If Login successfull then route to '/projects' route
                this.$router.push('/projects');
            })
            .catch(err => console.log(err));   
        }
    }
    
}
</script>

<style scoped>

input{
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
    font-size: 12px;
}
input:focus{
    border: 1px solid #fff;
    border-top: none;
    border-left: none;
    border-right: none;
}

</style>






