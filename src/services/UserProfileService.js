import axios from "axios";

export default {

    sendGetUsersProfilesRequest(){
        return axios.get('/profiles')
    }


}


//import axios from "axios";
//
// export default {
//    sendGetUsersRequest(){
//        return axios.get('/users')
//    },
//
//    sendPostUserRequest(userData) {
//        return axios.post('/users', userData)
//    },
// }