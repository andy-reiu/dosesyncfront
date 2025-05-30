import axios from "axios";

export default {
    sendGetProfileRequest(studyId) {
        return axios.get('/profile', {
            params: {
                studyId: studyId
            }
        })
    },

    sendUpdateProfileRequest(changedValues) {
       return axios.put('/api/profile-update', changedValues)
    },

    sendGetCurrentProfileRequest() {
        return axios.get(`/api/profile-current?profileId=${sessionStorage.getItem("profileId")}`)
    },
}