<template>    
  <nav>

    <v-toolbar dark color="cyan darken-3">
      <v-app-bar-nav-icon color="cyan darken-3" @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" v-if="! isLoggedIn" class="white--text text-decoration-none">PMS</router-link>
        <router-link to="/departments" v-if="isLoggedIn" class="white--text text-decoration-none">PMS</router-link>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      
      <div v-if="isLoggedIn">
        <v-btn text color="blue-grey" >
          <v-icon class="white--text">mdi-logout-variant </v-icon><a href class="white--text text-decoration-none" @click.prevent="logOut">Logout</a> 
        </v-btn> 
        
      </div>
    </v-toolbar> 
    <v-navigation-drawer
      v-model="drawer"
      app
      v-if="isLoggedIn"
      height="100%"
      color="blue-grey darken-3"
      permanent
      hide-overlay
      expand-on-hover
      dark
      dense
      mini-variant
      class="py-10 px-auto"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar v-if="loggedInUserImage">
            <v-img :src="loggedInUserImage"></v-img>
          </v-list-item-avatar>
          <v-list-item-avatar v-else>
            <v-img src="../assets/profile.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link router to="/profile">
          <v-list-item-content>
            <v-list-item-title v-model="loggedInUser">
                {{loggedInUser}}
            </v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list v-if="loggedInUserType == 'admin'">
        <v-list-item
        v-for="item in itemsAdmin"
        :key="item.title"
        router :to="item.route"
        active-class="deep-blue--text text--accent-1"
        
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
        v-for="item in items"
        :key="item.title"
        router :to="item.route"
        active-class="deep-blue--text text--accent-1"
        
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

     
    </v-navigation-drawer>

  </nav>
</template>

<script lang="ts">
import { Component,  Vue, Watch } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
    private drawer= false;
    private  group= null;
    private items= [
          { title: 'Projects', icon: 'mdi-view-dashboard', route: '/projects' },
          { title: 'Departments', icon: 'mdi-clipboard-list', route: '/departments' },
          { title: 'My Profile', icon: 'mdi-account', route: '/profile' },
          { title: 'My Tasks', icon: 'mdi-clipboard-list', route: '/my-tasks' }
    ]
    private itemsAdmin= [
          { title: 'Projects', icon: 'mdi-view-dashboard', route: '/projects' },
          { title: 'Departments', icon: 'mdi-clipboard-list', route: '/departments' },
          { title: 'My Profile', icon: 'mdi-account', route: '/profile' },
          { title: 'Employees', icon: 'mdi-account-group', route: '/employees' },
          { title: 'My Tasks', icon: 'mdi-clipboard-list', route: '/my-tasks' }
    ]
    // get the logged in username
    get loggedInUserName(){ 
      return this.$store.state.auth.userName;
    }
    get loggedInUserType(){ 
      return this.$store.state.auth.userType;
    }
    // get the logged in user's name
    get loggedInUser(){ 
      return this.$store.state.auth.name;
    }
    // Get the logged in user image
    get loggedInUserImage(){ 
      return `http://localhost:3000/employees/employeeImage/${this.$store.state.auth.empImage}`
    }
    // Get the access token from store
    get isLoggedIn(){ 
      return this.$store.state.auth.token;
    }

    updated() {
      this.loggedInUser;
      this.loggedInUserImage;

    }

    @Watch('group')
    groupChange () {
        this.drawer = false
    }




    

    logOut() {
      this.$store.dispatch('auth/logout')
      .then(()=> {
        this.$router.push('/');
      })

      
    }
}
</script>


<style scoped>
 
</style>