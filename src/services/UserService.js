import axios from "axios";

export default {

   sendPostUserRequest(userData) {
       return axios.post('/users', userData)
   },

    sendUpdateUserStatusRequest(userId, userStatus) {

        return axios.patch('/admin-view/' + userId + '/user-status', null,
            {
                params: {
                    userStatus: userStatus,
                }
            }
        )
    },

    sendGetUserRequest() {
       return axios.get('/admin-view/users')
    },
}