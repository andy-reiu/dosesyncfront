import axios from "axios";

export default {

    sendGetUsersProfilesRequest(){
        return axios.get('/profiles')
    },
}