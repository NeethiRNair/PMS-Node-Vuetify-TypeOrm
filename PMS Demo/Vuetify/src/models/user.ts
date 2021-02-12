// Model for login data(Username and password)
export default class User {
    userName: string;
    password: string;
    constructor(userName: string, password: string) {
      this.userName = userName;
      this.password = password;
    }
  }