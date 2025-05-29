import axios from "axios";

export default {
    sendGetProfileRequest(studyId) {
        return axios.get("/profile", {
            params: {
                studyId: studyId
            }
        })
    }
}