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

    sendGetUserProfileRequest(userId) {
        return axios.get('/userprofile', {
            params: {
                userId: userId
            }
        })
    },

}