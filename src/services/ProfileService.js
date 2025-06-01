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

    sendUpdateProfileRequest(changedValues) {
        return axios.put('/api/profile-update', changedValues)
    },

    sendGetCurrentProfileRequest() {
        return axios.get(`/api/profile-current?profileId=${sessionStorage.getItem("profileId")}`)
    },

    sendPutUpdateProfileRequest(userId, profileInfo) {
        return axios.put('/account-profile/update', profileInfo, {
            params: {
                userId: userId,
            }
        });
    },
}