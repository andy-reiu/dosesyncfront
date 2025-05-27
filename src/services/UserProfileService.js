import axios from "axios";

export default {

    sendGetUserProfileRequest(){
        return axios.get('/profiles')
    }

}


//import axios from "axios";
//
// export default {
//    sendGetUserRequest(){
//        return axios.get('/users')
//    },
//
//    sendPostUserRequest(userData) {
//        return axios.post('/users', userData)
//    },
// }