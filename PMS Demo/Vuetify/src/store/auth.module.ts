import AuthService from "../services/AuthService";
import authHeader from '../services/auth-header';

export const auth = {
  namespaced: true,
  state: { 
    status: '',
    userName: '', 
    token : localStorage.getItem('token'),
    empImage: '',
    name: '',
    employeeId: -1,
    userType: '',
  },
  getters : {
  
  },
  actions: {
    login({ commit }: any, user: any) {
      return AuthService.login(user).then(
        (user: any) => {
          commit('LOGIN_SUCCESS', user);
          return Promise.resolve(user);
        })
      .catch(err => {
        commit('LOGIN_FAILURE');
        AuthService.logout();
        return Promise.reject(err);
      });
    },
    logout({ commit }: any) {
      AuthService.logout();
      authHeader();
      commit('LOGOUT');
    },
    updateUser({ commit }: any,  user: any) {
      commit('UPDATE_USER', user);
    },
    
  },
  mutations: {
    // save the user information of the logged in user to the state variables
    LOGIN_SUCCESS(state: any, user: any) {
      state.status = 'success';
      state.token = user.access_token;
      state.userName = user.userName;
      state.empImage = user.image;
      state.name = user.name;
      state.employeeId = user.id;
      state.userType = user.userType;
    },
    // rSet status to error if login failed
    LOGIN_FAILURE(state: any) {
      state.status = 'error';
      state.token = null;
    },
    // Reset all the state variables when logged out
    LOGOUT(state: any) {
      state.status = null;
      state.token = null;
      state.user = null;
      state.empImage = null;
      state.name = null;
      state.employeeId = null;
      state.userType = null;
    },
    // Update user info if profile information changed
    UPDATE_USER(state: any, user: any){
      state.empImage = user.image;
      state.name = user.name;

    }
   
  }
};














 /* registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    } */









/* register({ commit }, user) {
  return AuthService.register(user).then(
    response => {
      commit('registerSuccess');
      return Promise.resolve(response.data);
    },
    error => {
      commit('registerFailure');
      return Promise.reject(error);
    }
  );
} */