import axios from "axios";

export default {
    sendGetStudiesRequest() {
        return axios.get('/studies')
    },

    sendPostStudyRequest(study) {
        return axios.post('/study', study)
    },
}