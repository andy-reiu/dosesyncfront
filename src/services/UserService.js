import axios from "axios";

export default {
   sendGetUserRequest(){
       return axios.get('/users')
   },

   sendPostUserRequest(userData) {
       return axios.post('/users', userData)
   },
}