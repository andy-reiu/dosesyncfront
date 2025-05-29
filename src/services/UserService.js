import axios from "axios";

export default {
   sendGetUserRequest(userId) {
       return axios.get('/user',{
           params: {
               userId: userId
           }
       })
   },

    sendGetUsersRequest(){
       return axios.get('/users')
   },

   sendPostUserRequest(userData) {
       return axios.post('/users', userData)
   },
}