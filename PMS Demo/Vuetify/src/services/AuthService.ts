import http from "../http-common";
import { server } from "../helper";


class AuthDataService {
  // Login the user if the credentials provided matches
  login(user: any){
    return http.post(`${server.baseURL}/employees/login`, user)
    .then((response: any) => {
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    })
    .catch((e: any) => {
      console.log(e);
    })
  }
  // Remove the access_token form local storage to logout the employee
  logout(){
    localStorage.removeItem("token");
  }
}

export default new AuthDataService();