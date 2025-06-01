import axios from "axios";

export default {
    sendGetProfileRequest(studyId) {
        return axios.get("/profile", {
            params: {
                studyId: studyId
            }
        })
    },

    sendGetUsersProfilesRequest() {
        return axios.get('/profiles')
    },

    sendGetUserProfileInfoRequest(userId) {
        return axios.get('/userprofile', {
            params: {
                userId: userId
            }
        })
    },

    sendPutUpdateProfileRequest(userId, profileInfo) {
        return axios.put('/account-profile/update', profileInfo, {
            params: {
                userId: userId,
            }
        });
    },
}