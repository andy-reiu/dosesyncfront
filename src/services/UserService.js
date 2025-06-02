import axios from "axios";

export default {
    sendGetUserInfoRequest(userId) {
        return axios.get('/user', {
            params: {
                userId: userId
            }
        })
    },

    sendPostUserRequest(userData) {
        return axios.post('/user', userData)
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

    sendPutUpdateUserRequest(selectedUserId, userInfo) {
        return axios.put('/user/update', userInfo, {
            params: {
                selectedUserId: selectedUserId,
            }
        });
    },
}