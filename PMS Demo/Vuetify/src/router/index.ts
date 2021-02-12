import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store'



Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

  {
    path: '/',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import("../views/ProfilePage.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: () => import("../views/Departments.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/departments/:id/employees',
    name: 'EmployeesTable',
    component: () => import("../views/EmployeesTableView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: '/task/:id',
    name: 'TaskDetails',
    component: () => import("../views/TaskDetails.vue"),
    
  },

  {
    path: '/projects',
    name: 'ProjectsDashboard',
    component: () => import("../views/ProjectsDashboard.vue")
  },
 
  {
    path: '/projects/:id',
    name: 'ProjectDetails',
    component: () => import( '../views/ProjectDetails.vue')
  },
  {
    path: '/projects/:id/employees',
    name: 'ProjectEmployees',
    component: () => import( '../views/ProjectEmployees.vue')
  },
  {
    path: '/projects/:id/tasks',
    name: 'ProjectTasks',
    component: () => import( '../views/ProjectTasks.vue')
  },
  {
    path: '/my-tasks',
    name: 'MyTasks',
    component: () => import("../views/MyTasks.vue"),
    
  },
  {
    path: '/employees',
    name: 'AllEmployees',
    component: () => import("../views/AllEmployees.vue"),
    
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
