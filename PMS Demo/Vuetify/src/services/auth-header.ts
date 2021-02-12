export default function authHeader() {

    const token = localStorage.getItem('token');
      // Checks Local Storage for access token
      // If there is a logged in user with accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object.
      if (token) {
        return { Authorization: 'Bearer ' + token };
      } else {
        return {};
      }

  
}
  